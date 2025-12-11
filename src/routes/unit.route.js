import express from 'express';
import { createUnit, getAllUnits, getUnitById } from '../controllers/unit.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', createUnit);
router.get('/', getAllUnits);
router.get('/:id', getUnitById);

// Exportando el router usando CommonJS
export default router;