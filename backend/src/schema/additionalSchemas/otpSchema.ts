import { Schema, model } from "mongoose";

export interface IOtp {
  email: string;
  otp: string;
  createdAt?: Date;
}

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 1000 * 5,
  },
});

const Otp = model("Otp", otpSchema);
export default Otp;