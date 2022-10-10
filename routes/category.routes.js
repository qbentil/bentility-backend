import { createCategory, deleteCategory, getCategories, getCategory, publishCategory, unpublishCategory, updateCategory } from '../controllers/category.controllers.js';
import { verifyAccessToken, verifySuperAdmin } from '../middlewares/Verifications.js';

import {Router} from 'express';

const router = Router();

// CREATE CATEOGRY
router.post('/', verifyAccessToken ,createCategory)

// READ CATEGORIES
router.get('/', getCategories)

// UPDATE CATEGORY
router.put('/:id', verifyAccessToken, updateCategory)

// DELETE CATEGORY
router.delete('/:id', verifySuperAdmin, deleteCategory)

// GET SINGLE CATEGORY
router.get('/category', getCategory)

// PUBLISH CATEGORY
router.put('/publish/:id', verifySuperAdmin, publishCategory)

// UNPUBLISH CATEGORY
router.put('/unpublish/:id', verifySuperAdmin, unpublishCategory)

export default router;