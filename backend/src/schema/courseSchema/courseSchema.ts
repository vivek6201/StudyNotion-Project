import { Schema, model } from "mongoose";

export interface ICourse {
  courseName: string;
  courseDescription: string;
  courseInstructor: string;
  courseContent: string[];
  courseCategory: string;
  ratingAndReviews: string[];
  studentsEnrolled: string[];
  isDiscounted: boolean;
  discount: number;
  courseStatus: string;
  coursePrice: number;
  courseThumbnail: string;
}

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseInstructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    courseCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    ratingAndReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "ratingReview",
      },
    ],
    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    courseStatus: {
      type: String,
      enum: ["Active", "Draft", "Inactive"],
      default: "Draft",
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    courseThumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);
export default Course;