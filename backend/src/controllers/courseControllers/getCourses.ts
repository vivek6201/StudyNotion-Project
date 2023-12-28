import { Request, Response } from "express";
import Course from "../../schema/courseSchema/courseSchema";
import statusCode from "../../utils/statusCodes";

export const getAllCoursesController = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    return res.status(statusCode.OK).json({
      message: "Course fetched Successfully",
      courses: courses,
    });
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const getCourseController = async (req: Request, res: Response) => {
  try {
    const { id: courseId } = req.params;

    const courseExists = await Course.findById(courseId)
      .populate([
        {
          path: "courseContent",
          populate: {
            path: "sectionContent",
            model: "subSection",
          },
        },
        "courseInstructor",
        "courseCategory",
      ])
      .exec();

    if (!courseExists) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Course does not exist",
      });
    }

    return res.status(statusCode.OK).json({
      message: "Course Data Fetched Successfully",
      data: courseExists,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
