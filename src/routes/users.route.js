// Importando la dependencia 'express' usando CommonJS
import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/users
router.post( '/', createUser );


// Exportando el router usando CommonJS
export default router;