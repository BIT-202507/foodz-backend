import { Schema, model } from 'mongoose';

// Creando una instancia del esquema de entidad User
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        // Reglas
        type: String,       // Define el tipo
        required: true,     // Es obligatorio
        // Modificador
        unique: true,       // Obliga a que el valor sea unico
        trim: true,         // Elimina los espacios en blanco (inicio/final del string)
        lowercase: true     // Transforma todo a minusculas
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 12
        // TODO: Aprender Expresiones Regulares
    },
    role: {
        type: String,
        enum: [ 'super-admin', 'admin', 'editor', 'colaborator', 'registered' ],
        default: 'registered'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // code: {
    //     type: String,   // 
    //     trim: true
    // }
},{});

// Crear el modelo User basado en el esquema userSchema
const userModel = model(
    'users',            // Nombre de la coleccion en singular 'User'
    userSchema          // Esquema asociado al modelo
); 

// Exportando el modelo User, para que sea usado en otras partes de la aplicacion
export default userModel;
