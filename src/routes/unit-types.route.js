// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { deleteUnitTypeById, getAllUnitTypes, getUnitTypeById, registerUnitTypes, updateUnitTypeById } from '../controllers/unit-types.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', registerUnitTypes);
router.get('/', getAllUnitTypes);       // Ahora soporta ?name=...
router.get('/:id', getUnitTypeById);
router.patch('/:id', updateUnitTypeById);
router.delete('/:id', deleteUnitTypeById);


// Exportando el router usando CommonJS
export default router;