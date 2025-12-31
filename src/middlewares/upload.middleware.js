import multer from 'multer';
import { createUpload } from '../config/multer.config.js';
import { MAX_FILE_UPLOAD_LIMIT, UPLOAD_PATHS } from '../config/global.config.js';

/**
 * Factory para crear middleware de subida de UN solo archivo.
 * 
 * @param {string} subfolder - Carpeta destino (ej: 'products', 'avatars').
 *                             Usa UPLOAD_PATHS del config.
 * @param {string} fieldName - Nombre del campo en el form-data (default: 'file')
 * @param {string} context   - Nombre de la entidad para mensajes de error (default: 'archivo')
 * @returns {Function} - Middleware de Express
 */
export const createUploadFileMiddleware = (subfolder = UPLOAD_PATHS.DEFAULT, fieldName = 'file', context = 'archivo') => {
    return (req, res, next) => {
        // Configuramos el contexto para errores personalizados en el controller
        req.uploadContext = context;

        // 1. Obtenemos la instancia de Multer configurada para esa carpeta
        const upload = createUpload(subfolder);

        // 2. Obtenemos el handler para 'file' (o el nombre personalizado)
        const multerSingle = upload.single(fieldName);

        // 3. Ejecutamos Multer
        multerSingle(req, res, (err) => {
            if (err) {
                return handleMulterError(err, res);
            }
            // Inyectamos la carpeta donde se guardó para referencia futura si se necesita
            // Aunque req.file.path ya lo tiene
            next();
        });
    };
};

/**
 * Factory para crear middleware de subida de MÚLTIPLES archivos.
 * 
 * @param {string} subfolder - Carpeta destino
 * @param {string} fieldName - Nombre del campo en el form-data (default: 'files')
 * @param {string} context   - Nombre de la entidad para mensajes de error (default: 'archivos')
 * @returns {Function} - Middleware de Express
 */
export const createUploadMultipleMiddleware = (subfolder = UPLOAD_PATHS.DEFAULT, fieldName = 'files', context = 'archivos') => {
    return (req, res, next) => {
        req.uploadContext = context;

        const upload = createUpload(subfolder);
        // Permitimos personalizar el nombre del campo array
        const multerArray = upload.array(fieldName, MAX_FILE_UPLOAD_LIMIT);

        multerArray(req, res, (err) => {
            if (err) {
                return handleMulterError(err, res);
            }
            next();
        });
    };
};

// Mantenemos compatibilidad hacia atrás (o shortcuts) exportando
// las versiones por defecto si alguien las importaba
export const uploadSingle = createUploadFileMiddleware(UPLOAD_PATHS.DEFAULT);
export const uploadMultiple = createUploadMultipleMiddleware(UPLOAD_PATHS.DEFAULT);


/**
 * Función de ayuda para manejar los errores de Multer de forma centralizada.
 */
const handleMulterError = (err, res) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'El archivo es demasiado grande. Máximo 5MB permitidos.'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: `Has excedido el límite de ${MAX_FILE_UPLOAD_LIMIT} archivos o el campo no es correcto.`
            });
        }
        return res.status(400).json({ message: `Error al subir archivo: ${err.message}` });
    }

    if (err.message === 'Solo se permiten archivos de imagen!') {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
        message: `Error interno al procesar archivo: ${err.message}`
    });
};
