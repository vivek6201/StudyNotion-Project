import { Schema, model } from "mongoose";

export interface ICourseCategory {
  categoryName: string;
  categoryDescription: string;
  courses: string[];
}

const courseCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const Category = model("Category", courseCategorySchema);
export default Category;