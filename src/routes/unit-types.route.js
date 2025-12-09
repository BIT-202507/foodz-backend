// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { deleteUnitTypeById, deleteUnitTypeByName, getAllUnitTypes, getUnitTypeById, getUnitTypeByName, registerUnitTypes, updateUnitTypeById } from '../controllers/unit-types.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', registerUnitTypes);
router.get( '/', getAllUnitTypes );
router.patch( '/:id', updateUnitTypeById );
router.get( '/:id/id', getUnitTypeById );
router.get( '/:name/name', getUnitTypeByName );
router.delete( '/:id/remove/id', deleteUnitTypeById );
router.delete( '/:name/remove/name', deleteUnitTypeByName );


// Exportando el router usando CommonJS
export default router;