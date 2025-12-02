import userModel from "../models/User.model.js";

const createUser = async ( req, res ) => {
    const data = req.body;         // Extraer el cuerpo de la peticion

    // Mostrar en consola el cuerpo de la peticion
    console.log( data );           // Imprimir en consola el cuerpo de la peticion

    // Registrar los datos usando el userModel
    const dataRegistered = await userModel.create( data );   // Registrar los datos en la base de datos


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