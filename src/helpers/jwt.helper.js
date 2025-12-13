import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    try {
        return jwt.sign(
            payload,                // Payload: Carga util (Datos enviar en token al FrontEnd)
            'semilla',              // Semilla: Cadena de texto para generar el token
            { expiresIn: '1h' }     // Expiracion: Tiempo de vida del token
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}


export {
    generateToken
}