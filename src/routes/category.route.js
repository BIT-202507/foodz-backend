import express from 'express';

import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { createCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/categories
router.post(
    '/',
    [authenticationUser, authorizationUser],
    createCategory
);
router.get(
    '/',
    [authenticationUser, authorizationUser],
    getAllCategories
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser],
    getCategoryById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser],
    updateCategory
);


export default router;