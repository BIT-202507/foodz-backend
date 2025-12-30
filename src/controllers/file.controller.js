import FileModel from '../models/File.model.js';

/**
 * Controlador para subir archivos.
 * Este controlador se ejecuta DESPUÉS de que el middleware de multer
 * haya procesado el archivo y lo haya guardado en disco.
 */
export const uploadFile = async (req, res) => {
    try {
        // Multer agrega el objeto 'file' (si es uno) o 'files' (si son varios) al objeto 'req'
        // Si no existen, significa que no se subió nada o hubo un error previo
        if (!req.file && !req.files) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo' });
        }

        // Normalizamos para manejar siempre un array, ya sea 1 o varios archivos
        const filesToSave = req.files ? req.files : [req.file];
        const savedFiles = [];

        // Iteramos sobre cada archivo procesado por Multer
        for (const file of filesToSave) {
            // Creamos una nueva instancia del modelo File
            // 'file' contiene toda la info que nos da Multer (path, size, mimetype, etc.)
            const newFile = new FileModel({
                filename: file.filename,
                originalName: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                path: file.path,
                // createdBy: req.user ? req.user._id : null // Futuro: Vincular con usuario autenticado
            });

            // Guardamos la METADATA del archivo en MongoDB
            const savedFile = await newFile.save();
            savedFiles.push(savedFile);
        }

        // Preparamos la respuesta: devolvemos objeto único si fue subida simple, o array si fue múltiple
        const response = req.file ? savedFiles[0] : savedFiles;

        res.status(201).json({
            message: 'Archivo(s) subido(s) exitosamente',
            data: response
        });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ message: 'Error interno del servidor al subir archivo' });
    }
};
