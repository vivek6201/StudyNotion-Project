import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IProfile {
  gender?: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: number;
  aboutMe?: string;
  contactNumber?: number;
}

const profileSchema: Schema = new Schema(
  {
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    aboutMe: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;
