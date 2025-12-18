import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
import { loginUser, reNewToken } from '../controllers/auth.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = Router();

// Definir las rutas para la autenticacion

// http://localhost:3000/api/v1/auth/login
router.post('/login', loginUser);

// http://localhost:3000/api/v1/auth/register
router.post('/register', createUser);             // Solo registra usuario (No necesita estar autenticado)

// http://localhost:3000/api/v1/auth/renew-token
router.get(
    '/renew-token',
    [authenticationUser, authorizationUser],
    reNewToken
);


export default router;