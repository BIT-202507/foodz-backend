import FileModel from '../models/File.model.js';
import fs from 'fs';
import path from 'path';

/**
 * Controlador para subir archivos.
 * Este controlador se ejecuta DESPUÉS de que el middleware de multer
 * haya procesado el archivo y lo haya guardado en disco.
 */
export const uploadFile = async (req, res) => {
    try {
        // Multer agrega el objeto 'file' (si es uno) o 'files' (si son varios) al objeto 'req'
        // Si no existen, significa que no se subió nada o hubo un error previo
        if (!req.file && (!req.files || req.files.length === 0)) {
            const entity = req.uploadContext || 'archivo'; // fallback genérico
            return res.status(400).json({ message: `No se ha subido ${entity}` });
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

/**
 * Elimina un archivo individual por ID
 * Borra tanto el registro en BD como el archivo físico
 */
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await FileModel.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }

        // Intentamos borrar el archivo físico
        // Usamos try-catch interno para no bloquear la eliminación de BD si el archivo ya no existe físicamente
        try {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        } catch (err) {
            console.warn(`No se pudo eliminar el archivo físico: ${file.path}`, err);
        }

        // Borramos registro de BD
        await FileModel.findByIdAndDelete(id);

        res.json({ message: 'Archivo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        res.status(500).json({ message: 'Error interno al eliminar archivo' });
    }
};

/**
 * Elimina múltiples archivos dados sus IDs
 * Body esperado: { ids: ["id1", "id2"] }
 */
export const deleteMultipleFiles = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de IDs en el cuerpo de la petición' });
        }

        // Buscamos todos los archivos a eliminar para obtener sus paths
        const files = await FileModel.find({ _id: { $in: ids } });

        if (files.length === 0) {
            return res.status(404).json({ message: 'No se encontraron archivos con los IDs proporcionados' });
        }

        const deletedIds = [];
        const errors = [];

        // Iteramos para borrar archivos físicos
        for (const file of files) {
            try {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
                deletedIds.push(file._id);
            } catch (err) {
                console.warn(`Error borrando archivo físico ${file._id}:`, err);
                errors.push({ id: file._id, error: 'Error borrado físico' });
                // Aún así podríamos querer borrarlo de BD, o marcarlo con error. 
                // En este caso, asumimos que si falló el borrado físico, igual lo sacamos de la BD para mantener consistencia de datos vs storage (limpieza manual posterior)
                // O podríamos decidir NO borrarlo de BD.
                // Política elegida: Borrar de BD de todas formas.
                deletedIds.push(file._id);
            }
        }

        // Borramos registros en BD
        // Usamos deleteMany con los IDs que validamos que existian
        await FileModel.deleteMany({ _id: { $in: deletedIds } });

        res.json({
            message: 'Proceso de eliminación masiva completado',
            deletedCount: deletedIds.length,
            requestedCount: ids.length,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error('Error en eliminación masiva:', error);
        res.status(500).json({ message: 'Error interno al eliminar archivos' });
    }
};
