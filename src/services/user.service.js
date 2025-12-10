import UserModel from "../models/User.model.js";

const dbRegisterUser = async ( newUser ) => {
    return await UserModel.create( newUser);
}

const dbGetUserByEmail = async ( email ) => {
    return await UserModel.findOne({ email });
}


export {
    dbRegisterUser,
    dbGetUserByEmail
}