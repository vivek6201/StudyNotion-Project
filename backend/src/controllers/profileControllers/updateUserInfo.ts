import { Request, Response } from "express";
import userProfileValidations from "../../validations/profileValidations/userProfileValidations";
import statusCode from "../../utils/statusCodes";
import * as z from "zod";
import User from "../../schema/userSchema/userSchema";
import Profile, { IProfile } from "../../schema/userSchema/profileSchema";

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
    let userProfileData : IProfile;

    //update user data
    if (!user.profileInfo) {
        userProfileData = await Profile.create<IProfile>({
            ...validatedData,
        });
    } else {
        userProfileData = await Profile.findByIdAndUpdate(
            user.profileInfo,
            {
                ...validatedData,
            },
            { new: true }
        ) as IProfile; 
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
    
};
