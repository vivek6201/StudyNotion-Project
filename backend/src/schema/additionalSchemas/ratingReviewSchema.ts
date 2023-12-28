import { Schema, model } from "mongoose";

export interface IRatingReview {
  course: string;
  user: string;
  rating?: number;
  review: string;
}

const ratingReviewSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

const ratingReview = model<IRatingReview>("ratingReview", ratingReviewSchema);
export default ratingReview;