import express from 'express';

import { createUnit, getAllUnits, getUnitById, updateUnit, deleteUnit } from '../controllers/unit.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

import { ROLES, ALLOWED_ROLES } from '../config/global.config.js';

const router = express.Router();

router.post(
    '/',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    createUnit
);
router.get(
    '/',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getAllUnits
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getUnitById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],
    updateUnit
);
router.delete(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN])],
    deleteUnit
);

export default router;
