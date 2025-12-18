import { Router } from 'express';

import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

import { ROLES, ALLOWED_ROLES } from '../config/global.config.js';

const router = Router();

// Definicion de las rutas (EndPoints)
// http://localhost:3000/api/v1/users
router.post(
    '/',                                        // Path
    [authenticationUser, authorizationUser([ROLES.ADMIN])],    // Solo Admin crea users manualmente
    createUser                                  // Controller
);     // Registrar usuarios privado (Administador/Loguarse)
router.get(
    '/',                                        // Path
    [authenticationUser, authorizationUser([ROLES.ADMIN])],    // Solo Admin ve lista completa
    getAllUsers                                 // Controller
);
router.get(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLABORATOR])],    // Middlewares
    getUserById                                 // Controller
);  // Parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser([ROLES.ADMIN])],    // Middlewares
    deleteUserById                              // Controller
);
router.patch(
    '/:idUser',                                 // Path
    [authenticationUser, authorizationUser([ROLES.ADMIN])],    // Middlewares
    updateUserById                              // Controller
);


export default router;