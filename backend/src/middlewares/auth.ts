import { Request, Response, NextFunction } from "express";
import statusCode from "../utils/statusCodes";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Token not found",
      });
    }

    const tokenData = jwt.verify(
      token as string,
      process.env.JWT_SIGNATURE!
    ) as JwtPayload;

    req.headers.userId = tokenData.userId;
    req.headers.role = tokenData.role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(statusCode.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.headers;

    if (role !== "Student") {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "You are not a student",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(statusCode.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};

export const isInstuctor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.headers;

    if (role !== "Instructor") {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "You are not an instructor",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(statusCode.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};
