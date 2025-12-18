import express from 'express';

import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { createCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';

import { ROLES, ALLOWED_ROLES } from '../config/global.config.js';

const router = express.Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/categories
router.post(
    '/',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    createCategory
);
router.get(
    '/',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getAllCategories
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getCategoryById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    updateCategory
);


export default router;