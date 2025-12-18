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
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = express.Router();

// ==========================================
// Core Product Routes
// ==========================================
router.post(
    '/',
    [authenticationUser, authorizationUser],
    createProduct
);
router.get(
    '/',
    [authenticationUser, authorizationUser],
    getAllProducts
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser],
    getProductById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser],
    updateProduct
); // Or patch
router.delete(
    '/:id',
    [authenticationUser, authorizationUser],
    deleteProduct
); // Soft delete

// ==========================================
// Nutrition Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/nutrition
router.get(
    '/:id/nutrition',
    [authenticationUser, authorizationUser],
    getProductNutrition
);

// PUT /api/v1/products/:id/nutrition
router.patch(
    '/:id/nutrition',
    [authenticationUser, authorizationUser],
    updateProductNutrition
);

// ==========================================
// Ingredient Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/ingredients
router.get(
    '/:id/ingredients',
    [authenticationUser, authorizationUser],
    getProductIngredients
);

// POST /api/v1/products/:id/ingredients
router.post(
    '/:id/ingredients',
    [authenticationUser, authorizationUser],
    addProductIngredient
);

// DELETE /api/v1/products/:id/ingredients/:ingredientId
// Note: We need the product ID in the path for context if needed, but mainly the ingredientId to delete.
router.delete(
    '/:id/ingredients/:ingredientId',
    [authenticationUser, authorizationUser],
    removeProductIngredient
);


export default router;