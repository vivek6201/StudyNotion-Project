import { Request, Response } from "express";
import userProfileValidations from "../../validations/profileValidations/userProfileValidations";
import statusCode from "../../utils/statusCodes";
import * as z from "zod";
import User, { IUser } from "../../schema/userSchema/userSchema";
import Profile, { IProfile } from "../../schema/userSchema/profileSchema";
import { FileArray } from "express-fileupload";
import fileUploadCloudinary from "../../services/fileUploader";

export const updateUserDataController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;
    const isValidData = userProfileValidations.safeParse(req.body);
    if (!isValidData.success) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Invalid data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            issue: issue.message,
          };
        }),
      });
    }
    const validatedData: z.infer<typeof userProfileValidations> =
      isValidData.data;

    //check userID is present or not
    if (!userId) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "UserId not Valid",
      });
    }

    //check user is present or not
    let user = await User.findById(userId);
    if (!user) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "User not found",
      });
    }
    let userProfileData: IProfile;

    //update user data
    if (!user.profileInfo) {
      userProfileData = await Profile.create<IProfile>({
        ...validatedData,
      });
    } else {
      userProfileData = (await Profile.findByIdAndUpdate<IProfile>(
        user.profileInfo,
        {
          ...validatedData,
        },
        { new: true }
      )) as IProfile;
    }

    await User.findByIdAndUpdate(
      userId,
      {
        profileInfo: userProfileData,
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "User data updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const updateUserProfilePicController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.headers;
    const { profilePic } = req.files as FileArray;

    if (!profilePic) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "image not provided",
      });
    }

    const checkUser = await User.findById(userId);

    if (!checkUser) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "User not found",
      });
    }

    let imageUrl: string = "";
    try {
      const res = await fileUploadCloudinary(
        profilePic,
        process.env.FOLDER_NAME!,
        null,
        80
      );
      imageUrl = res.secure_url;
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Failed to upload image",
      });
    }

    const userData = (await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: imageUrl,
      },
      { new: true }
    ).populate("profileInfo")) as IUser;

    userData.password = "";

    return res.status(statusCode.OK).json({
      message: "Profile photo uploaded successfully",
      userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal serverv error",
    });
  }
};
