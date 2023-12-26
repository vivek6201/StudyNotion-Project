import { Schema, model } from "mongoose";

export interface ICourseSubSection {
  sectionId: string;
  subSectionName: string;
  subSectionDescription: string;
  duration: string;
  videoUrl: string;
}

const courseSubSectionSchema = new Schema(
  {
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    subSectionName: {
      type: String,
      required: true,
    },
    subSectionDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const subSection = model("subSection", courseSubSectionSchema);
export default subSection;
