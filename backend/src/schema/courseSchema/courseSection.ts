import { Schema, model } from "mongoose";

export interface ICourseSection {
  courseId: string;
  sectionName: string;
  sectionDescription: string;
  sectionContent?: string[];
}

const courseSectionSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    sectionDescription: {
      type: String,
      required: true,
    },
    sectionContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "subSection",
      },
    ],
  },
  { timestamps: true }
);

const Section = model<ICourseSection>("Section", courseSectionSchema);
export default Section; 