import { encryptedPassword } from "../helpers/bcrypt.helper.js";
import { dbGetUserByEmail, dbRegisterUser } from "../services/user.service.js";

const createUser = async ( req, res ) => {
    try {
        const inputData = req.body;

        // Paso 1: Verificar si el usuario existe
        const userFound = await dbGetUserByEmail( inputData.email );

        if( userFound ) {
            return res.json({ msg: 'No se puede registrar. El usuario ya existe' });
        }

        // Paso 2: Encriptar la contraseña que envio el usuario
        console.log( 'inputData antes de encriptar: ', inputData );
        inputData.password = encryptedPassword( inputData.password );  // Devuelve el password encriptado
        console.log( 'inputData despues de encriptar: ', inputData );

        // Paso 3: Registrar el usuario
        const userRegistered = await dbRegisterUser( inputData );
    
        // TODO Paso 4: Eliminar propiedades con datos sensibles

        // Paso 5: Responder al cliente
        res.json({ userRegistered });
    } catch (error) {
        console.error( error );
        res.json({ msg: 'Error: Al crear usuario' })
    }

}

/// ...


export {
    createUser
}