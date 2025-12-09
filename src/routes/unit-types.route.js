// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { getAllUnitTypes, getUnitTypeById, getUnitTypeByName, registerUnitTypes } from '../controllers/unit-types.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', registerUnitTypes);
router.get( '/', getAllUnitTypes );
router.get( '/:id/id', getUnitTypeById );
router.get( '/:name/name', getUnitTypeByName );


// Exportando el router usando CommonJS
export default router;