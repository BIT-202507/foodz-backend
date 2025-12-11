import { verifyToken } from "../helpers/jwt.helper.js";

const authenticationUser = ( req, res, next ) => {
    try {

        // Paso 1: Obtener el string donde viene el token
        const token = req.header( 'X-Token' );
        
        // Paso 2: Verifica que la cadena no venga vacia
        if( ! token ) {
            return res.json({ msg: 'Error: Cadena del token vacia' });
        }
    
        // Paso 3: Verificar si el token es valido
        const payload = verifyToken( token );
        
        // Paso 4: Enviar a traves del Request los datos del payload
        req.payload  = payload;

        // Paso 5: Saltar a la siguiente funcion definida en la ruta
        next();
        
    } catch (error) {
        console.error( error );
        res.json({ msg: 'Error token invalido' });
    }

}


export default authenticationUser;