import upload from '../config/multer.config.js';
import { MAX_FILE_UPLOAD_LIMIT } from '../config/global.config.js';

export const uploadMultiple = (req, res, next) => {
    // Definimos el middleware de Multer: campo 'files', máx definido en config global
    // Usamos la instancia 'upload' importada de la configuración
    const uploadMiddleware = upload.array('files', MAX_FILE_UPLOAD_LIMIT);

    uploadMiddleware(req, res, (err) => {
        if (err) {
            // Manejamos errores específicos de Multer
            if (err.name === 'MulterError') {
                // LIMIT_UNEXPECTED_FILE ocurre cuando se excede el número de archivos (o el field name está mal)
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).json({
                        message: 'Error de validación en la carga de archivos',
                        detail: `Has excedido el límite de ${MAX_FILE_UPLOAD_LIMIT} archivos permitidos o el campo no se llama "files".`
                    });
                }

                // Otros errores de Multer (tamaño, tipo, etc.)
                return res.status(400).json({
                    message: 'Error al subir archivos',
                    error: err.code
                });
            }

            // Error desconocido / del servidor
            return res.status(500).json({
                message: 'Error interno del servidor al procesar archivos',
                error: err.message
            });
        }

        // Si no hay error, pasamos al controlador
        next();
    });
};

export default upload;
