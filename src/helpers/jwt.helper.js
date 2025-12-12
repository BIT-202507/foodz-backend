import jwt from 'jsonwebtoken';

const generateToken = ( payload ) => {

    const token = jwt.sign(
        payload,                // Carga util
        process.env.JWT_SEED,   // Semilla (Palabra Secreta) ==> Salt
        { expiresIn: '1h' }     // Opciones de configuracion del Token
    );

    console.info( 'token: ', token );
    return token;
}

const verifyToken = ( token ) => {
    return jwt.verify(
        token,              // Token Valido
        process.env.JWT_SEED, // Semilla (Palabra Secreta) ==> Salt
    );
}


export {
    generateToken,
    verifyToken
}