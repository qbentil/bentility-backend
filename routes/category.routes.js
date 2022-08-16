import { createCategory, getCategories } from '../controllers/category.controllers.js';

import {Router} from 'express';

const router = Router();

// CREATE CATEOGRY
router.post('/', createCategory)

// READ CATEGORIES
router.get('/', getCategories)

// UPDATE CATEGORY
router.put('/:id', (req, res) => {})

// DELETE CATEGORY
router.delete('/:id', (req, res) => {})

// GET SINGLE CATEGORY
router.get('/category', (req, res) => {})

export default router;