import userModel from "../models/User.model.js";

// Servicio: Se debe encargar solo de la comunicacion directa con la base de datos
const dbRegisterUser = async ( newUser ) => {
    return await userModel.create( newUser );    // async/await por que el Modelo retorna una promesa.
}

const dbGetAllUser = async () => {
    return await userModel.find();
}

const dbGetUserById = () => {}


export {
    dbRegisterUser,
    dbGetAllUser,
    dbGetUserById
}