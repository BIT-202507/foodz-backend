// Controlador: Se debe encargar de Recibir las peticiones y responder a ellas
import userModel from "../models/User.model.js";
import { dbDeleteUserById, dbGetAllUser, dbGetUserById, dbRegisterUser } from "../services/user.service.js";

const createUser = async ( req, res ) => {

    // Se controla la exception que ocurre en el Paso 2 (Try/Catch)
    try {
        // Paso 1: Extraer el cuerpo de la peticion
        const data = req.body;         
    
        // Mostrar en consola el cuerpo de la peticion
        console.log( data );           // Imprimir en consola el cuerpo de la peticion
    
        // Paso 2: Registrar los datos usando el userModel
        const dataRegistered = await dbRegisterUser( data );   // Registrar los datos en la base de datos
    
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

const getAllUsers = async ( req, res ) => {
    try {
        const users = await dbGetAllUser();
    
        res.json({
            msg: 'Obtiene todos los usuarios',
            users
        });
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo obtener el listado de usuarios'
        });    
    }

}

const getUserById = async ( req, res ) => {
    try {
        const idUser = req.params.idUser;
    
        const user = await dbGetUserById( idUser );
    
        res.json({
            user
        });
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo obtener usuario por ID'
        });
    }

}

const deleteUserById = async ( req, res ) => {
    try {
        const idUser = req.params.idUser;
    
        const userDeleted = await dbDeleteUserById( idUser );
    
        res.json({
            userDeleted
        });
        
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo eliminar el usuario por ID'
        });
    }

}


export {
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById
}