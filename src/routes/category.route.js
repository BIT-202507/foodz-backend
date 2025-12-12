import express from 'express';
import { createCategory } from '../controllers/category.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/categories
router.post('/', createCategory);


export default router;