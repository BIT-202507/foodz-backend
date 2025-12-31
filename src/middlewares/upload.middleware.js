import multer from 'multer';
import upload from '../config/multer.config.js';
import { MAX_FILE_UPLOAD_LIMIT } from '../config/global.config.js';

/**
 * Middleware para controlar la subida de UN solo archivo.
 * 
 * En lugar de usar 'upload.single()' directamente en la ruta,
 * creamos esta función para poder interceptar los errores de Multer.
 * 
 * Si hubo un error (archivo muy grande, tipo incorrecto), devolvemos
 * un mensaje claro al usuario. Si todo sale bien, usamos next() para avanzar.
 */
export const uploadSingle = (req, res, next) => {
    // 1. Obtenemos la función middleware de Multer configurada para un archivo
    // 'file' es el nombre del campo que esperamos del formulario
    const multerSingle = upload.single('file');

    // 2. Ejecutamos esa función manualmente
    // Multer necesita (req, res, callback)
    multerSingle(req, res, (err) => {
        // 3. Verificamos si hubo algún error durante la subida
        if (err) {
            return handleMulterError(err, res);
        }

        // 4. Si NO hubo error, todo salió bien.
        // Llamamos a next() para que Express pase al siguiente controlador (uploadFile)
        next();
    });
};

/**
 * Middleware para controlar la subida de MÚLTIPLES archivos.
 * Funciona igual que el anterior, pero configurado para arrays.
 */
export const uploadMultiple = (req, res, next) => {
    // 'files' es el nombre del campo esperado
    // MAX_FILE_UPLOAD_LIMIT limita cuántos archivos se pueden subir a la vez
    const multerArray = upload.array('files', MAX_FILE_UPLOAD_LIMIT);

    multerArray(req, res, (err) => {
        if (err) {
            return handleMulterError(err, res);
        }
        next();
    });
};

/**
 * Función de ayuda para manejar los errores de Multer de forma centralizada.
 * Traduce los códigos de error técnicos a mensajes amigables.
 */
const handleMulterError = (err, res) => {
    // Caso A: El error es especifico de Multer
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
        // Cualquier otro error de Multer
        return res.status(400).json({ message: `Error al subir archivo: ${err.message}` });
    }

    // Caso B: El error viene de nuestro filtro (fileFilter en la config), por ejemplo "Solo imagenes"
    if (err.message === 'Solo se permiten archivos de imagen!') {
        return res.status(400).json({ message: err.message });
    }

    // Caso C: Error desconocido del servidor
    return res.status(500).json({
        message: `Error interno al procesar archivo: ${err.message}`
    });
};

// Exportamos la configuración original por si se necesita en otro lado
export default upload;
