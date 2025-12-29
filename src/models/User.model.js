import { Schema, model } from 'mongoose';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';

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
        minLength: 8
        // TODO: Aprender Expresiones Regulares
    },
    role: {
        type: String,
        enum: ALLOWED_ROLES,
        default: ROLES.REGISTERED
    },
    clientType: {
        type: String,
        enum: ['casual', 'member'],
        default: 'casual'
    },
    profile: {
        phone: String,
        address: String,
        city: String,
        preferences: [String] // Ej: "Sin sal", "Vegetariano"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    activationCode: {
        type: String,
        trim: true,
        default: null
    }
}, {
    versionKey: false,              // Elimina el versionamiento de la estructura
    timestamps: true                // Habilita los campos createAt, updatedAt
});

// Crear el modelo User basado en el esquema userSchema
const userModel = model(
    'user',             // Nombre de la coleccion en singular 'User'
    userSchema          // Esquema asociado al modelo
);

// Exportando el modelo User, para que sea usado en otras partes de la aplicacion
export default userModel;