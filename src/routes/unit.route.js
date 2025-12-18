import express from 'express';

import { createUnit, getAllUnits, getUnitById, updateUnit, deleteUnit } from '../controllers/unit.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.post(
    '/',
    [authenticationUser, authorizationUser],
    createUnit
);
router.get(
    '/',
    [authenticationUser, authorizationUser],
    getAllUnits
);
router.get(
    '/:id',
    [authenticationUser, authorizationUser],
    getUnitById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser],
    updateUnit
);
router.delete(
    '/:id',
    [authenticationUser, authorizationUser],
    deleteUnit
);

export default router;
