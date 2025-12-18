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

import { ROLES, ALLOWED_ROLES } from '../config/global.config.js';

const router = express.Router();

// ==========================================
// Core Product Routes
// ==========================================
router.post(
    '/',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    createProduct
);
router.get(
    '/',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getAllProducts
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getProductById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    updateProduct
); // Or patch
router.delete(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN])], // Solo admin puede borrar
    deleteProduct
); // Soft delete

// ==========================================
// Nutrition Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/nutrition
router.get(
    '/:id/nutrition',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getProductNutrition
);

// PUT /api/v1/products/:id/nutrition
router.patch(
    '/:id/nutrition',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    updateProductNutrition
);

// ==========================================
// Ingredient Routes (Sub-resource)
// ==========================================
// GET /api/v1/products/:id/ingredients
router.get(
    '/:id/ingredients',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getProductIngredients
);

// POST /api/v1/products/:id/ingredients
router.post(
    '/:id/ingredients',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    addProductIngredient
);

// DELETE /api/v1/products/:id/ingredients/:ingredientId
// Note: We need the product ID in the path for context if needed, but mainly the ingredientId to delete.
router.delete(
    '/:id/ingredients/:ingredientId',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    removeProductIngredient
);


export default router;