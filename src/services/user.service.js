import userModel from "../models/User.model.js";

// Servicio: Se debe encargar solo de la comunicacion directa con la base de datos
const dbRegisterUser = async (newUser) => {
    return await userModel.create(newUser);    // async/await por que el Modelo retorna una promesa.
}

const dbGetAllUser = async () => {
    return await userModel.find();
}

const dbGetUserById = async (_id) => {
    return await userModel.findById(_id);
    return await userModel.findOne({ _id });
}

const dbGetUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}

const dbDeleteUserById = async (_id) => {
    return await userModel.findOneAndDelete({ _id });
    return await userModel.findByIdAndDelete(_id);
}


export {
    dbRegisterUser,
    dbGetAllUser,
    dbGetUserById,
    dbDeleteUserById,
    dbGetUserByEmail
}