import { Schema, model } from "mongoose";

export interface ICourseProgress {
  course: string;
  user: string;
  progress?: number;
  completed?: boolean;
}

const courseProgressSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseProgress = model("courseProgress", courseProgressSchema);
export default courseProgress;