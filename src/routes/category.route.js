import express from 'express';
import { createCategory, getAllCategories, getCategoryById } from '../controllers/category.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/categories
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);


export default router;