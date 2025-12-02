// Controlador: Se debe encargar de Recibir las peticiones y responder a ellas
import { registerUser } from "../services/user.service.js";

const createUser = async ( req, res ) => {

    // Se controla la exception que ocurre en el Paso 2 (Try/Catch)
    try {
        // Paso 1: Extraer el cuerpo de la peticion
        const data = req.body;         
    
        // Mostrar en consola el cuerpo de la peticion
        console.log( data );           // Imprimir en consola el cuerpo de la peticion
    
        // Paso 2: Registrar los datos usando el userModel
        const dataRegistered = await registerUser( data );   // Registrar los datos en la base de datos
    
        // Paso 3: Responder al cliente
        res.json({ 
            msg: 'Crear un usuario',
            // data: data,             // Forma tradicional   
            dataRegistered             // ECMAScript 2015   
        });
    } 
    catch ( error ) {
        // Paso 3: Se responde al cliente cuando se produce una exception
        console.error( error );
        res.json({
            msg: 'Error: No se pudo crear el usuario'
        });     
    }

}


export {
    createUser
}