import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  courses?: string[];
  accountStatus?: string;
  profilePicture?: string;
  profileInfo?: string;
  resetPassToken?: string;
  resetPassTokenExpiry?: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    accountStatus: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
    profilePicture: {
      type: String,
    },
    profileInfo: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    resetPassToken: String,
    resetPassTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
