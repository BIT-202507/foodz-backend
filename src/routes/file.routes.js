import { Router } from 'express';
import upload from '../middlewares/upload.middleware.js';
import { uploadFile } from '../controllers/file.controller.js';
import { MAX_FILE_UPLOAD_LIMIT } from '../config/global.config.js';

const router = Router();

// Definimos la ruta POST para subir archivos
// 1er argumento: la ruta URL ('/upload')
// 2do argumento: el middleware 'upload.single', que procesa UN archivo
//                El string 'file' debe coincidir con el 'name' del input en el formulario frontend/postman
// 3er argumento: el controlador 'uploadFile', que se ejecuta SI el middleware fue exitoso
router.post('/upload', upload.single('file'), uploadFile);

// Nota: Para subir múltiples archivos a la vez, usaríamos:
const uploadMultiple = (req, res, next) => {
    // Definimos el middleware de Multer: campo 'files', máx definido en config global
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

router.post('/upload-multiple', uploadMultiple, uploadFile);
// Donde 'files' es el nombre del campo y MAX_FILE_UPLOAD_LIMIT es el maximo de archivos permitidos

export default router;
