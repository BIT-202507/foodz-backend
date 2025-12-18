import { validateToken } from "../helpers/jwt.helper.js";
import { dbGetUserById } from "../services/user.service.js";

const authenticationUser = async (req, res, next) => {
    try {
        // Paso 1: Extraer el token del header
        const token = req.header('X-Token');

        // Paso 2: Validar que el token exista
        if (!token) {
            return res.status(401).json({
                msg: 'Error: Cadena del token vacia'
            });
        }

        // Paso 2.5: Validar el formato del token (Debe tener 3 partes separadas por puntos)
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            return res.status(400).json({
                msg: 'Error: Formato de token invalido (Faltan componentes)'
            });
        }

        // Paso 3: Extraer el payload del token (decodificarlo)
        const payload = validateToken(token);

        if (!payload) {
            return res.status(401).json({
                msg: 'Error: Token invalido o expirado'
            });
        }

        // Paso 4: Eliminar propiedades sensibles del payload
        delete payload.iat;
        delete payload.exp;

        // Paso 5: Consultar la existencia del usuario en la base de datos
        const user = await dbGetUserById(payload.id);

        if (!user) {
            return res.status(401).json({ msg: 'Token no valido - usuario no existe en DB' });
        }

        // Paso 6: Verificar el estado del usuario activo
        if (!user.isActive) {
            return res.status(401).json({ msg: 'Token no valido - usuario con estado inactivo' });
        }

        // Paso 7: Enviar el payload a traves el objeto Request
        req.payload = payload;
        req.user = user;    // OPCIONAL: Enviar el usuario completo si se requiere en endpoints posteriores

        // Paso 8: El pasamos el control del flujo de la aplicacion a la siguiente funcion
        next();

    } catch (error) {
        console.error(error);
        res.json({ msg: 'Error token invalido' });
    }
}


export default authenticationUser;
