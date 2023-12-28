import { Request, Response } from "express";
import statusCode from "../../utils/statusCodes";
import Course from "../../schema/courseSchema/courseSchema";
import Section from "../../schema/courseSchema/courseSection";
import subSection from "../../schema/courseSchema/courseSubSection";
import ratingReview from "../../schema/additionalSchemas/ratingReviewSchema";
import User from "../../schema/userSchema/userSchema";

export const deleteCourseController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;
    const { id: courseId } = req.params;

    if (!courseId) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Course is required",
      });
    }

    const courseExists = await Course.findById(courseId);

    if (!courseExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Course not found",
      });
    }

    //delete section
    courseExists.courseContent.forEach(async (id) => {
      const isSection = await Section.findById(id);

      // delete sub section
      isSection &&
        isSection.sectionContent?.forEach(async (id) => {
          const isSubSection = await subSection.findById(id);
          isSubSection &&
            (await subSection.deleteOne({ _id: id }, { new: true }));
        });

      isSection && (await Section.deleteOne({ _id: id }, { new: true }));
    });

    //delete reviews and ratings
    courseExists.ratingAndReviews.forEach(async (id) => {
      const isReviewPresent = await ratingReview.findById(id);
      isReviewPresent &&
        (await ratingReview.deleteOne({ _id: id }, { new: true }));
    });

    await Course.deleteOne({ _id: courseId });

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          courses: { _id: courseId },
        },
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteCourseSectionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { sectionId } = req.params;

    const sectionExists = await Section.findById(sectionId);

    if (!sectionExists) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Section does not exists",
      });
    }

    sectionExists.sectionContent?.forEach(async (id) => {
      const subSectionExists = await subSection.findById(id);

      subSectionExists &&
        (await subSection.deleteOne({ _id: id }, { new: true }));
    });

    await Section.deleteOne({ _id: sectionId });

    await Course.findByIdAndUpdate(
      sectionExists.courseId,
      {
        $pull: { courseContent: { _id: sectionId } },
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Section deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteCourseSubSectionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { subSectionId } = req.params;

    const subSectionExists = await subSection.findById(subSectionId);

    if (!subSectionExists) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: "Sub section not found",
      });
    }

    await subSection.findByIdAndDelete(subSectionId);

    await Section.findByIdAndUpdate(
      subSectionExists.sectionId,
      {
        $pull: { sectionContent: { subSectionId } },
      },
      { new: true }
    );

    return res.status(statusCode.OK).json({
      message: "Sub Section deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
