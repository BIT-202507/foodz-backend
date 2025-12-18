import express from 'express';
import { createUnit, getAllUnits, getDeleteUnitById, getUnitById, updateUnitById } from '../controllers/unit.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', createUnit);
router.get('/', getAllUnits);
router.get('/:id', getUnitById);
router.delete('/:id', getDeleteUnitById);
router.patch('/:id', updateUnitById);

// Exportando el router usando CommonJS
export default router;