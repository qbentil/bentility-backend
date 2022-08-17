import Category from "../models/category.js";

// CREATE CATEOGRY
export const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();

    // remove isPublished property from response
    const { isPublished, ...rest } = category.toObject();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: rest,
    });
  } catch (error) {
    next(error);
  }
};

// READ CATEGORIES
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    // remove isPublished property from response
    const categoriesData = categories.map((category) => {
      const { isPublished, ...rest } = category._doc;
      return rest;
    });

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      total: categories.length,
      categories: categoriesData,
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
    const { isPublished, ...rest } = category._doc;
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: rest,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
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
      category,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE CATEOGRY
export const getCategory = async (req, res, next) => {
  const {key, value} = req.body;
  console.log(req.body);
  const keys = ["slug", "title"];
  if(!keys.includes(key)) {
      return res.status(400).json({
          success: false,
          message: "Invalid query key <[slug, title]>",
      });
  }
try {
  const category = await Category.findOne({[key]: value});
  if(!category) {
      res.status(404).json({
          success: false,
          message: "Category not found",
      });
  }
  res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: category,
  });

  
} catch (error) {
  next(error);
}
};