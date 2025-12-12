import { verifyEncriptedPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
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
    const payload = {
        id: userFound._id,          // Identificador Unico del Usuario, controlar quien hace que en la aplicacion
        name: userFound.name,       // Hola, Fulanito! 
        email: userFound.email,     // Para realizar comunicaciones (anonimas)
        role: userFound.role        // Para informar al frontend sobre la autorizacion que tienen los usuarios para acceder a las diferentes interfaces 
    };

    const token = generateToken( payload );


    // Paso 4: Eliminar propiedades con datos sensibles
    //         userFound es un BJSON (JSON Binario)
    const jsonUserFound = userFound.toObject();     // Convertir un BJSON a JSON

    delete jsonUserFound.password;      // Elimina la propiedad 'password' de un JSON

    // Paso 5: Responder al cliente
    res.json({ token, user: jsonUserFound });
}

const reNewToken = async ( req, res ) => {
    // Paso 1: Extrae el payload del objeto requests que hemos asignado desde el Middleware de Autenticacion
    const payload = req.payload;

    // Paso 2: Elimina propiedades innecesarias para el cliente
    delete payload.iat;
    delete payload.exp;

    // Paso 3: Verificar si el usuario sigue existiendo en la base de datos
    const userFound = await dbGetUserByEmail( payload.email );

    if( ! userFound ) {
        return res.json({ msg: 'Usuario ya no existe. No puede renovar el token' });
    }

    // Paso 4: Generar un nuevo token
    const token = generateToken({
        id: userFound._id,          // Identificador Unico del Usuario, controlar quien hace que en la aplicacion
        name: userFound.name,       // Hola, Fulanito! 
        email: userFound.email,     // Para realizar comunicaciones (anonimas)
        role: userFound.role        // Para informar al frontend sobre la autorizacion que tienen los usuarios para acceder a las diferentes interfaces 
    });

    // Paso 5: Eliminar propiedades con datos sensibles
    //         userFound es un BJSON (JSON Binario)
    const jsonUserFound = userFound.toObject();     // Convertir un BJSON a JSON

    delete jsonUserFound.password;      // Elimina la propiedad 'password' de un JSON

    // Paso 6: Responder al cliente
    res.json({ token, user: jsonUserFound });
}


export {
    loginUser,
    reNewToken
}