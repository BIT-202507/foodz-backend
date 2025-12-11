import jwt from 'jsonwebtoken';

const generateToken = ( payload ) => {

    const token = jwt.sign(
        payload,            // Carga util
        'siax%haecnhcfxny', // Semilla (Palabra Secreta) ==> Salt
        { expiresIn: '1h' }                  // Opciones de configuracion del Token
    );

    console.info( 'token: ', token );
    return token;
}

const verifyToken = ( token ) => {
    return jwt.verify(
        token,              // Token Valido
        'siax%haecnhcfxny', // Semilla (Palabra Secreta) ==> Salt
    );
}


export {
    generateToken,
    verifyToken
}