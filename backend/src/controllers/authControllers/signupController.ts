import User, { IUser } from "../../schema/userSchema/userSchema";
import { Request, Response } from "express";
import * as z from "zod";
import signupInputValidations from "../../validations/authValidations/signupValidations";
import statusCode from "../../utils/statusCodes";
import otpGeneratorModule from "otp-generator";
import Otp, { IOtp } from "../../schema/additionalSchemas/otpSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignupController = async (req: Request, res: Response) => {
  try {
    // get user data
    const isValidData = signupInputValidations.safeParse(req.body);

    // get query params from url to implement the functionality (if any)
    const queryParams: {
      sendOtp?: boolean;
      verifyOtp?: boolean;
    } = req.query;

    // check if data is valid
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

    const validatedData: z.infer<typeof signupInputValidations> =
      isValidData.data;

    // check if user already exists
    const userExists = await User.findOne({ email: validatedData.email });

    if (userExists) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "User already exists",
      });
    }

    //send otp to email
    if (queryParams.sendOtp) {
      const generatedOtp = otpGeneratorModule.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });

      // Generate OTP and save it to the database
      await Otp.create<IOtp>({
        email: validatedData.email,
        otp: generatedOtp,
      });

      // TODO: Send OTP to email
      return res.status(statusCode.CREATED).json({
        message: "OTP sent to email",
        code: generatedOtp,
      });
    }

    //verify otp and create user
    if (queryParams.verifyOtp) {
      // Verify OTP and send token to the user

      if (!validatedData.otp) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "OTP is required",
        });
      }

      // check if otp exists in the database
      const otpExists = await Otp.find({ email: validatedData.email })
        .sort({ createdAt: -1 })
        .limit(1);

      if (!otpExists[0].otp || otpExists[0].otp.length < 6) {
        return res.status(statusCode.UNAUTHORIZED).json({
          message: "Invalid OTP",
        });
      }

      // check if otp is valid
      if (Number(otpExists[0].otp) !== validatedData.otp) {
        return res.status(statusCode.UNAUTHORIZED).json({
          message: "Invalid OTP",
        });
      }

      //hashing the password before storing it to the datebase
      const hashedPassword = await bcryptjs.hash(validatedData.password, 10);
      validatedData.password = hashedPassword;

      //creating the user
      const newUser = await User.create<IUser>({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
        role: validatedData.role,
      });

      //creating the token
      const jwtToken = jwt.sign(
        {
          userId: newUser._id,
          role: newUser.role,
        },
        process.env.JWT_SIGNATURE!,
        {
          expiresIn: "1d",
        }
      );

      return res.status(statusCode.CREATED).json({
        message: "OTP verified and User created",
        token: jwtToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};
