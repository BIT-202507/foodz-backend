// Controlador: Se debe encargar de Recibir las peticiones y responder a ellas
import userModel from "../models/User.model.js";
import { dbDeleteUserById, dbGetAllUser, dbGetUserByEmail, dbGetUserById, dbRegisterUser } from "../services/user.service.js";
import { encryptedPassword } from "../helpers/bcrypt.helper.js";

const createUser = async (req, res) => {

    // Se controla la exception que ocurre en el Paso 2 (Try/Catch)
    try {
        // Paso 1: Extraer el cuerpo de la peticion
        const inputData = req.body;

        // Paso 2: Verificar si el usuario existe, por email
        const userFound = await dbGetUserByEmail(inputData.email);

        if (userFound) {
            return res.json({
                msg: 'El usuario ya existe, por favor intente loguearse'
            });
        }

        // Paso 3: Encriptar la contraseña, se guarde en la misma propiedad y en el mismo objeto de donde se extrajo
        inputData.password = encryptedPassword(inputData.password);

        // Paso 4: Registrar los datos usando el userModel
        const dataRegistered = await dbRegisterUser(inputData);   // Registrar los datos en la base de datos

        // Paso 5: Eliminar las propiedades sensibles
        const jsonUserFound = userFound.toObject();     // Convierte un BJSON (Documento de Mongo) en un JSON (JavaScript Object)
        delete jsonUserFound.password;


        // Paso 6: Responder al cliente
        res.json({
            user: jsonUserFound
        });
    }
    catch (error) {
        // Paso 3: Se responde al cliente cuando se produce una exception
        console.error(error);
        res.json({
            msg: 'Error: No se pudo crear el usuario'
        });
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await dbGetAllUser();

        res.json({
            msg: 'Obtiene todos los usuarios',
            users
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo obtener el listado de usuarios'
        });
    }

}

const getUserById = async (req, res) => {
    try {
        const idUser = req.params.idUser;

        const user = await dbGetUserById(idUser);

        res.json({
            user
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No pudo obtener usuario por ID'
        });
    }

}

const deleteUserById = async (req, res) => {
    try {
        const idUser = req.params.idUser;

        const userDeleted = await dbDeleteUserById(idUser);

        res.json({
            userDeleted
        });

    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo eliminar el usuario por ID'
        });
    }

}

const updateUserById = async (req, res) => {
    try {
        const inputData = req.body;
        const idUser = req.params.idUser;

        // TODO: Service

        // const userUpdated = await userModel.findByIdAndUpdate(
        //     idUser,              // ID
        //     inputData,           // Datos a actualizar
        //     { new: true }        // Configuracion
        // );
        const userUpdated = await userModel.findOneAndUpdate(
            { _id: idUser },     // Objeto de consulta debe tener el ID
            inputData,           // Datos a actualizar
            { new: true }        // Configuracion
        );

        res.json({
            userUpdated
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No pudo actualizar el usuario por ID'
        });
    }

}


export {
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
}