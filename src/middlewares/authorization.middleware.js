import { ALLOWED_ROLES } from "../config/global.config.js";

const authorizationUser = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const { role } = req.payload;

            // Verificar si existe el rol en el payload
            if (!role) {
                return res.status(403).json({
                    msg: 'Error: No tiene permisos (Rol no definido)'
                });
            }

            // Validar si el rol del usuario esta en la lista de roles permitidos para esta ruta
            if (!allowedRoles.includes(role)) {
                return res.status(403).json({
                    msg: `Error: El rol '${role}' no esta autorizado para esta accion`
                });
            }

            console.log(`Usuario autorizado con rol: ${role}`);
            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error de autorizacion del servidor' });
        }
    }
}


export default authorizationUser;
