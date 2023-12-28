import { Request, Response } from "express";
import {
  changePasswordInputValidations,
  forgotPasswordInputValidations,
  resetPasswordInputValidations,
} from "../../validations/authValidations/passwordValidations";
import statusCode from "../../utils/statusCodes";
import User from "../../schema/userSchema/userSchema";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const isValidEmail = forgotPasswordInputValidations.safeParse(req.body);

    if (!isValidEmail.success) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Invalid data",
        error: isValidEmail.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            issue: issue.message,
          };
        }),
      });
    }
    const validatedData = isValidEmail.data;

    // check if user exists
    const userExists = await User.findOne({ email: validatedData.email });

    if (!userExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const generatedToken: string = crypto.randomUUID();

    // save token to the database
    await User.findByIdAndUpdate(
      userExists._id,
      {
        resetPassToken: generatedToken,
        resetPassTokenExpiry: Date.now() + 60 * 1000 * 5,
      },
      { new: true }
    );

    const url = `http://localhost:3000/reset-password?token=${generatedToken}`;

    //todo: send otp to email
    return res.status(statusCode.CREATED).json({
      message: "Token sent successfully",
      url,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const isValidData = resetPasswordInputValidations.safeParse(req.body);

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

    const validatedData = isValidData.data;

    // check if user exists
    const userExist = await User.findOne({
      resetPassToken: token,
    });

    if (!userExist) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Token is invalid",
      });
    }

    const currentTime = new Date();
    const tokenExpiry = userExist?.resetPassTokenExpiry;

    if (!(tokenExpiry! > currentTime)) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Token expired",
      });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(validatedData.password, 10);

    // save password to the database
    await User.findByIdAndUpdate(
      userExist._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const isValidData = changePasswordInputValidations.safeParse(req.body);

    if (!isValidData.success) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Invalid Data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    const validatedData: z.infer<typeof changePasswordInputValidations> =
      isValidData.data;

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "User not found",
      });
    }

    const checkOldPass = bcryptjs.compareSync(
      validatedData.oldPassword,
      userExists.password
    );

    if (!checkOldPass) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Old passord is incorrect",
      });
    }

    const hashPass = bcryptjs.hashSync(validatedData.newPassword, 10);

    await User.findByIdAndUpdate(
      userId,
      {
        password: hashPass,
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};
