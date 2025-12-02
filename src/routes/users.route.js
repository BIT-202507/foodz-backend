// Importando la dependencia 'express' usando CommonJS
import { Router } from 'express';       // Desestructurando Router desde express

import { createUser } from '../controllers/user.controller.js';

const router = Router();

// Definicion de las rutas (EndPoints)
router.post( '/', createUser );


// Exportando el router usando CommonJS
export default router;