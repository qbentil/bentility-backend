import Category from "../models/category.js";
import Post from "../models/posts.js";
import createError from "../utils/Error.js";

// CREATE CATEOGRY
export const createCategory = async (req, res, next) => {
  req.body.user = req.user.id; // Append user id to req.body
  // console.log("category:", req.body);
  try {
    const category = new Category(req.body);
    await category.save();

    // remove isPublished property from response
    // const { isPublished, ...rest } = category.toObject();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// READ CATEGORIES
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      total: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    // remove isPublished property from response
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    // check if category has posts
    const posts = await Post.find({ category: id });
    if (posts.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Category has posts",
      });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE CATEOGRY
export const getCategory = async (req, res, next) => {
  let { key, value } = req.query;
  if (!key) key = "_id";
  const keys = ["_id", "slug", "title", "status"];
  if (!keys.includes(key)) {
    return next(
      createError("Invalid query key <[_id, slug, title, status]>", 400)
    );
  }
  if (!value) {
    return next(createError("Key Value is required", 400));
  }
  try {
    const category = await Category.findOne({ [key]: value });
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLISH CATEGORY
export const publishCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category published successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// UNPUBLISH CATEGORY
export const unpublishCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { status: "draft" },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category unpublished successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
