import express from 'express';
import { createUnit } from '../controllers/unit.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', createUnit);

// Exportando el router usando CommonJS
export default router;