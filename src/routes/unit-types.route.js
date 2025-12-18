// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { deleteUnitTypeById, getAllUnitTypes, getUnitTypeById, registerUnitTypes, updateUnitTypeById } from '../controllers/unit-types.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post(
    '/',
    [authenticationUser, authorizationUser],
    registerUnitTypes
);
router.get(
    '/',
    [authenticationUser, authorizationUser],
    getAllUnitTypes
);       // Ahora soporta ?name=...
router.get(
    '/:id',
    [authenticationUser, authorizationUser],
    getUnitTypeById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser],
    updateUnitTypeById
);
router.delete(
    '/:id',
    [authenticationUser, authorizationUser],
    deleteUnitTypeById
);


// Exportando el router usando CommonJS
export default router;