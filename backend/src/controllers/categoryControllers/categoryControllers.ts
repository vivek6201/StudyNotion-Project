import { Request, Response } from "express";
import { createCourseCategoryValidations } from "../../validations/courseValidations/courseValidations";
import statusCode from "../../utils/statusCodes";
import * as z from "zod";
import Category from "../../schema/courseSchema/courseCategory";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await Category.find().populate("courses").exec();

    if (!categories) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "No Categories found",
      });
    }

    return res.status(statusCode.CREATED).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, Contact Admin",
    });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const isValidData = createCourseCategoryValidations.safeParse(req.body);

    if (!isValidData.success) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Invalid data",
        error: isValidData.error.issues.map((issue) => {
          return { field: issue.path[0], message: issue.message };
        }),
      });
    }

    const validatedData: z.infer<typeof createCourseCategoryValidations> =
      isValidData.data;

    const newCategory = await Category.create({
      categoryName: validatedData.categoryName,
      categoryDescription: validatedData.categoryDescription,
    });

    return res.status(statusCode.OK).json({
      message: "Category Created Successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server Error",
    });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(id, { new: true });

    return res.status(statusCode.OK).json({
      message: "Catgory Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server Error",
    });
  }
};
