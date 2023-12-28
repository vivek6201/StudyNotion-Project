import { Request, Response } from "express";
import {
  courseValidations,
  sectionValidations,
  subSectionValidations,
} from "../../validations/courseValidations/courseValidations";
import statusCode from "../../utils/statusCodes";
import Course from "../../schema/courseSchema/courseSchema";
import Section from "../../schema/courseSchema/courseSection";
import subSection from "../../schema/courseSchema/courseSubSection";
import fileUploadCloudinary from "../../services/fileUploader";
import { string } from "zod";

export const updateCourseController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const isValidData = courseValidations.partial().safeParse(req.body);

    if (!isValidData.success) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Invalid Data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    const validatedData = isValidData.data;
    const courseExists = await Course.findById(courseId);

    if (!courseExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Course not found",
      });
    }

    const updatedData = await Course.findByIdAndUpdate(
      courseId,
      {
        ...validatedData,
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "course updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const updateCourseSectionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { sectionId } = req.params;

    const isValidData = sectionValidations.partial().safeParse(req.body);

    if (!isValidData.success) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Invalid Data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    const validatedData = isValidData.data;

    const sectionExists = await Section.findById(sectionId);

    if (!sectionExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Section not found",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      validatedData,
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Section updated Sucessfull",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};

export const updateCourseSubSectionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { subSectionId } = req.params;

    const isValidData = subSectionValidations.partial().safeParse(req.body);
    const lectureVideo = req.files?.lectureVideo;
    let videoUrl: string | null = null;

    if (!isValidData.success) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Invalid Data",
        error: isValidData.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    if (lectureVideo) {
      const res = await fileUploadCloudinary(
        lectureVideo,
        process.env.FOLDER_NAME!
      );
      videoUrl = res.secure_url;
    }

    const validatedData = isValidData.data;

    const subSectionExists = await subSection.findById(subSectionId);

    if (!subSectionExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Sub Section not found",
      });
    }

    const updatedSubSection = await subSection.findByIdAndUpdate(
      subSectionId,
      videoUrl !== null
        ? {
            ...validatedData,
            videoUrl,
          }
        : validatedData,
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Sub Section updated Sucessfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};
