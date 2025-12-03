// Importando la dependencia 'express' usando CommonJS
import { Router } from 'express';       // Desestructurando Router desde express

import { createUser, getAllUsers } from '../controllers/user.controller.js';

const router = Router();

// Definicion de las rutas (EndPoints)
router.post( '/', createUser );
router.get( '/', getAllUsers );


// Exportando el router usando CommonJS
export default router;