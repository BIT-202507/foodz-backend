import userModel from "../models/User.model.js";

// Servicio: Se debe encargar solo de la comunicacion directa con la base de datos
const registerUser = async ( newUser ) => {
    return await userModel.create( newUser );    // async/await por que el Modelo retorna una promesa.
}


export {
    registerUser
}