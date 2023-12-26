import { Request, Response } from "express";
import loginSchema from "../../validations/authValidations/loginValidations";
import User from "../../schema/userSchema/userSchema";
import statusCode from "../../utils/statusCodes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLoginController = async (req: Request, res: Response) => {
  try {
    const isValidData = loginSchema.safeParse(req.body);

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
    const userExist = await User.findOne({ email: validatedData.email });

    if (!userExist) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isPassCorrect = await bcryptjs.compare(
      validatedData.password,
      userExist.password
    );

    if (!isPassCorrect) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Incorrect password",
      });
    }

    // generate token
    res.status(statusCode.OK).json({
      message: "User logged in successfully",
      token: jwt.sign(
        {
          userId: userExist._id,
          role: userExist.role,
        },
        process.env.JWT_SIGNATURE!,
        {
          expiresIn: "1d",
        }
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};
