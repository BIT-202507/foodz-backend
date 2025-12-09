// Importando la dependencia 'express' usando CommonJS
import express from 'express';

import { registerUnitTypes } from '../controllers/unit-types.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints) para tipos de unidad
router.post('/', registerUnitTypes);


// Exportando el router usando CommonJS
export default router;