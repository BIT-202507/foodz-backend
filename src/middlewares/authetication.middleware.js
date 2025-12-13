import { validateToken } from "../helpers/jwt.helper.js";

const authenticationUser = (req, res, next) => {
    // Paso 1: Extraer el token del header
    const token = req.header('X-Token');

    // Paso 2: Validar que el token exista
    if (!token) {
        return res.json({
            msg: 'No se ha recibido un token'
        });
    }

    // Paso 3: Extraer el payload del token (decodificarlo)
    const payload = validateToken(token);

    // Paso 4: Eliminar propiedades sensibles del payload
    delete payload.iat;
    delete payload.exp;

    // Paso 5: Enviar el payload a traves el objeto Request
    req.payload = payload;

    // Paso 6: El pasamos el control del flujo de la aplicacion a la siguiente funcion
    next();
}


export {
    authenticationUser
}
