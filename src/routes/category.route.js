import express from 'express';
import {
    createCategory,
    getAllCategories,
    getDeleteCategoryById,
    getCategoryById,
    updateCategoryById
} from '../controllers/category.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para categorias
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.delete('/:id', getDeleteCategoryById);
router.patch('/:id', updateCategoryById);

// Exportando el router usando CommonJS
export default router;
