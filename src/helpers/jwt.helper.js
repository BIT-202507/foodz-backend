import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    try {
        return jwt.sign(
            payload,                // Payload: Carga util (Datos enviar en token al FrontEnd)
            process.env.JWT_SEED,   // Semilla: Cadena de texto para generar el token
            { expiresIn: '1h' }     // Expiracion: Tiempo de vida del token
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

const validateToken = (token) => {
    try {
        return jwt.verify(
            token,                 // Token: Cadena de texto para generar el token  
            process.env.JWT_SEED,  // Semilla: Cadena de texto para generar el token
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}


export {
    generateToken,
    validateToken
}