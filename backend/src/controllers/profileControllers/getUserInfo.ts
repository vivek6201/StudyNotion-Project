import { Request, Response } from "express";
import statusCode from "../../utils/statusCodes";
import User from "../../schema/userSchema/userSchema";

export const getUserDataController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;

    // get userData
    const userData = await User.findById(userId)
      .populate(["profileInfo"])
      .exec();

    if (!userData) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User not found",
      });
    }

    userData.password = "";

    return res.status(statusCode.OK).json({
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const getUserCoursesController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;

    const checkUser = await User.findById(userId);

    if (!checkUser) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "user not found",
      });
    }

    return res.status(statusCode.OK).json({
      message: "Course fetched successfully",
      courses: checkUser.courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};
