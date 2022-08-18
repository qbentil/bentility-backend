import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/category.controllers.js';

import {Router} from 'express';

const router = Router();

// CREATE CATEOGRY
router.post('/', createCategory)

// READ CATEGORIES
router.get('/', getCategories)

// UPDATE CATEGORY
router.put('/:id', updateCategory)

// DELETE CATEGORY
router.delete('/:id', deleteCategory)

// GET SINGLE CATEGORY
router.get('/category', getCategory)

export default router;