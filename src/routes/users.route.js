// Importando la dependencia 'express' usando CommonJS
import { Router } from 'express';       // Desestructurando Router desde express

import { createUser, getAllUsers, getUserById } from '../controllers/user.controller.js';

const router = Router();

// Definicion de las rutas (EndPoints)
router.post( '/', createUser );
router.get( '/', getAllUsers );
router.get( '/:idUser', getUserById );  // Parametrizar la ruta: Crear un parametro en la ruta que funje como variable


// Exportando el router usando CommonJS
export default router;