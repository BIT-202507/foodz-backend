import { Schema, model } from 'mongoose';

// Definimos el esquema para nuestra colección de archivos ('Files')
// Este esquema guardará la METADATA del archivo (información sobre el archivo),
// no el archivo en sí (el archivo binario se guarda en el sistema de archivos del servidor)
const fileSchema = new Schema({
    // Nombre que multer le asignó al archivo en el servidor (ej: 173550000-random.jpg)
    filename: {
        type: String,
        required: true,
        trim: true
    },
    // Nombre original con el que el usuario subió el archivo (ej: mi_foto_perfil.jpg)
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    // Tipo de archivo MIME (ej: 'image/jpeg', 'image/png', 'application/pdf')
    // Útil para saber qué tipo de contenido es y validarlo
    mimetype: {
        type: String,
        required: true
    },
    // Tamaño del archivo en bytes
    size: {
        type: Number,
        required: true
    },
    // Ruta física o relativa donde se guardó el archivo en el servidor
    path: {
        type: String,
        required: true
    },
    // Referencia al usuario que subió el archivo (Opcional por ahora)
    // Se usa un ObjectId para relacionarlo con la colección 'User'
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    versionKey: false, // Evita que mongoose añada el campo __v
    timestamps: true   // Añade automáticamente createdAt y updatedAt
});

// Creamos y exportamos el modelo 'File'
const fileModel = model('File', fileSchema);

export default fileModel;
