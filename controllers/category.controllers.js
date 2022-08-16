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
}

// READ CATEGORIES
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        
        // remove isPublished property from response
        
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            categories,
        });
    } catch (error) {
        next(error);
    }
}