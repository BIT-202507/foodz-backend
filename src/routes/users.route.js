// Importando la dependencia 'express' usando CommonJS
import { Router } from 'express';       // Desestructurando Router desde express

import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.js';

const router = Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/users
router.post('/', createUser);     // Registrar usuarios privado (Administador/Loguarse)
router.get('/', getAllUsers);
router.get('/:idUser', getUserById);  // Parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete('/:idUser', deleteUserById);
router.patch('/:idUser', updateUserById);

// Exportando el router usando CommonJS
export default router;