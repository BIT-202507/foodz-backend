import { validatePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const loginUser = async (req, res) => {
    // Paso 1: Extraer el cuerpo de la peticion
    const inputData = req.body;

    // Paso 2: Verificar si el NO usuario existe, por email
    const userFound = await dbGetUserByEmail(inputData.email);

    if (!userFound) {
        return res.json({
            msg: 'El usuario NO existe, por favor registrese'
        });
    }

    // Paso 3: Verificar si la contrasenia cohincide (si es correcta)
    const isValidPassword = validatePassword(inputData.password, userFound.password);

    if (!isValidPassword) {
        return res.json({
            msg: 'Sus credenciales no son validas'
        });
    }

    // Paso 4: Generar la credencial digital (Token)
    const payload = {
        id: userFound._id,      // Referenciar quien hace que en la applicacion
        name: userFound.name,   // Puedo usar este dato para personalizar mensajes
        email: userFound.email, // Puedo usar este dato para enviar mensajes anonimos entre usuarios de la aplicacion
        role: userFound.role    // Puedo usar este dato para acceder a las diferentes rutas permisionadas en el FrontEnd
    };

    const token = generateToken(payload);

    // Paso 5: Eliminar todas las propiedades con datos sensibles
    const jsonUserFound = userFound.toObject();     // Convertir un documento de MongoDB (BJSON), en un JavaScript Object (JSON)
    delete jsonUserFound.password;                  // Elimina la propiedad 'password' del JSON

    // Paso 6: Responder al cliente con el token y los datos del usuario
    res.json({ token, user: jsonUserFound });
}

const reNewtoken = async (req, res) => {
    // Paso 1: Extraer el payload del Objeto Request
    const payload = req.payload;

    // Paso 2: Verificar que el usuario al que se le va a generar el nuevo token no ha siso eliminado de la base de datos (por seguridad, tambien verificar el usuario esta activo)
    const userFound = await dbGetUserByEmail(payload.email);

    if (!userFound) {
        return res.json({
            msg: 'No se renueva el token. El usuario ha sido eliminado o esta inactivo'
        });
    }

    // Paso 3: Crear el nuevo token con el payload actualizado
    const newPayload = {
        id: userFound._id,      // Referenciar quien hace que en la applicacion
        name: userFound.name,   // Puedo usar este dato para personalizar mensajes
        email: userFound.email, // Puedo usar este dato para enviar mensajes anonimos entre usuarios de la aplicacion
        role: userFound.role    // Puedo usar este dato para acceder a las diferentes rutas permisionadas en el FrontEnd
    };

    // Paso 4: Generar el nuevo token
    const newToken = generateToken(newPayload);

    // Paso 5: Eliminar las propiedades con datos sensibles 
    const jsonUserFound = userFound.toObject();     // Convertir un documento de MongoDB (BJSON), en un JavaScript Object (JSON)
    delete jsonUserFound.password;                  // Elimina la propiedad 'password' del JSON

    // Paso 6: Envia respuesta al cliente con el nuevo Token y los datos actualizados el
    res.json({ token: newToken, user: jsonUserFound });
}


export {
    loginUser,
    reNewtoken
}