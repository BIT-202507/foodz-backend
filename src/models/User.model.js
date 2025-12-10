import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
    name: {
        //Reglas
        type : String,
        required : true,
        //Modificador
        trim : true // Esto ayuda a quitar espacios delante y/o detras de lo escrito 
        },
    username: {
        type : String,
        required : true,
        trim : true,
        unique : true, //Imposibilita el que exista mas de un "username" con las mismas propiedades
        lowercase: true //Pide que todo sea en minuscula 
    },
    email: {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true
    },
    password:{
        type : String,
        required : true,
        trim: true,
        minLength : 4,
        maxLenght : 12
    },
    role:{
        type : String,
        require : true,
        enum : ['admin','colaborator','registered'], // Crear "predeterminados"
        default: 'registered'
    },
    isActive : {
        type : Boolean,
        default : true
    },
},{
    versionKey : false,
    timestamps: true
});

const UserModel = model(
    'users', // nombre de la lista(coleccion) de datos de los ususarios
    UserSchema // nombre del esquema asociado al modelo 
);


export default UserModel;