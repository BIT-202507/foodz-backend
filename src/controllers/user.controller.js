// Controlador: Se debe encargar de Recibir las peticiones y responder a ellas
import { registerUser } from "../services/user.service.js";

const createUser = async ( req, res ) => {
    const data = req.body;         // Extraer el cuerpo de la peticion

    // Mostrar en consola el cuerpo de la peticion
    console.log( data );           // Imprimir en consola el cuerpo de la peticion

    // Registrar los datos usando el userModel
    const dataRegistered = await registerUser( data );   // Registrar los datos en la base de datos

    // Responder al cliente
    res.json({ 
        msg: 'Crear un usuario',
        // data: data,             // Forma tradicional   
        dataRegistered             // ECMAScript 2015   
    });
}


export {
    createUser
}