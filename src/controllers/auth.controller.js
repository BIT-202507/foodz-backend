import { verifyEncriptedPassword } from "../helpers/bcrypt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const loginUser = async ( req, res ) => {
    const inputData = req.body;

    // Paso 1: Verificar si el usuario NO existe (Por favor registrese)
    const userFound = await dbGetUserByEmail( inputData.email );

    if( ! userFound ) {
        return res.json({ msg: 'Usuario no existe. Por favor haga su registro' });
    }

    // Paso 2: Verificar si la contrasenia cohincide
    const isMatch = verifyEncriptedPassword( inputData.password, userFound.password );

    if( ! isMatch ) {
        return res.json({ msg: 'Credenciales invalidas' });
    }

    // Paso 3: Generar credencial digital (Token)

    // Paso 4: Eliminar propiedades con datos sensibles

    // Paso 5: Responder al cliente
    res.json({ msg: 'Usuario logueado! :)' });
}


export {
    loginUser
}