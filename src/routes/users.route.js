// Importando la dependencia 'express' usando CommonJS
import { Router } from 'express';       // Desestructurando Router desde express

import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.js';
import { authenticationUser } from '../middlewares/authetication.middleware.js';
import { authorizationUser } from '../middlewares/authorization.middleware.js';

const router = Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/users
router.post(
    '/',                                        // Path
    [authenticationUser, authorizationUser],    // Middlewares
    createUser                                  // Controller
);     // Registrar usuarios privado (Administador/Loguarse)
router.get(
    '/',                                        // Path
    [authenticationUser, authorizationUser],    // Middlewares
    getAllUsers                                 // Controller
);
router.get(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser],    // Middlewares
    getUserById                                 // Controller
);  // Parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser],    // Middlewares
    deleteUserById                              // Controller
);
router.patch(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser],    // Middlewares
    updateUserById                              // Controller
);

// Exportando el router usando CommonJS
export default router;