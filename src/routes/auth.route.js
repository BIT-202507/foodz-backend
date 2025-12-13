import { Router } from "express";
import { loginUser, reNewtoken } from "../controllers/auth.controller.js";
import { createUser } from "../controllers/user.controller.js";
import { authenticationUser } from "../middlewares/authetication.middleware.js";
import { authorizationUser } from "../middlewares/authorization.middleware.js";

const router = Router();

// Definir las rutas para la creacion, autenticacion, renovacion del token
// http://localhost:3000/api/v1/auth
router.post('/login', loginUser);
router.post('/register', createUser);       // Registrar usuarios publica
router.get(
    '/renew-token',     // Path
    [authenticationUser, authorizationUser],                 // Middlewares
    reNewtoken          // Controller
);


export default router;