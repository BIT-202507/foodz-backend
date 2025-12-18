import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductNutrition,
    updateProductNutrition,
    addProductIngredient,
    getProductIngredients,
    removeProductIngredient
} from '../controllers/product.controller.js';

const router = express.Router();

// ==========================================
// Core Product Routes
// ==========================================
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct); // Or patch
router.delete('/:id', deleteProduct); // Soft delete

// ==========================================
// Nutrition Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/nutrition
router.get('/:id/nutrition', getProductNutrition);

// PUT /api/v1/products/:id/nutrition
router.patch('/:id/nutrition', updateProductNutrition);

// ==========================================
// Ingredient Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/ingredients
router.get('/:id/ingredients', getProductIngredients);

// POST /api/v1/products/:id/ingredients
router.post('/:id/ingredients', addProductIngredient);

// DELETE /api/v1/products/:id/ingredients/:ingredientId
// Note: We need the product ID in the path for context if needed, but mainly the ingredientId to delete.
router.delete('/:id/ingredients/:ingredientId', removeProductIngredient);

export default router;