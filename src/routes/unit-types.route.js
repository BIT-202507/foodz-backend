// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { deleteUnitTypeById, getAllUnitTypes, getUnitTypeById, registerUnitTypes, updateUnitTypeById } from '../controllers/unit-types.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ROLES, ALLOWED_ROLES } from '../config/global.config.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post(
    '/',
    [authenticationUser, authorizationUser([ROLES.ADMIN])], // Writes restricted to Admin
    registerUnitTypes
);
router.get(
    '/',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getAllUnitTypes
);       // Ahora soporta ?name=...
router.get(
    '/:id',
    [authenticationUser, authorizationUser(ALLOWED_ROLES)],
    getUnitTypeById
);
router.patch(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN])],
    updateUnitTypeById
);
router.delete(
    '/:id',
    [authenticationUser, authorizationUser([ROLES.ADMIN])],
    deleteUnitTypeById
);


// Exportando el router usando CommonJS
export default router;