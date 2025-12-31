import { Router } from 'express';
import { createUploadFileMiddleware, createUploadMultipleMiddleware } from '../middlewares/upload.middleware.js';
import { UPLOAD_PATHS } from '../config/global.config.js';
import { uploadFile, deleteFile, deleteMultipleFiles } from '../controllers/file.controller.js';

const router = Router();

// ==========================================
// Rutas de SUBIDA (Upload)
// ==========================================

// 1. Subida genérica (se va a la carpeta por defecto 'others')
router.post('/upload',
    createUploadFileMiddleware(UPLOAD_PATHS.DEFAULT, 'file', 'archivo'),
    uploadFile
);

// 2. Subida específica para PRODUCTOS
router.post('/upload/product',
    createUploadFileMiddleware(UPLOAD_PATHS.PRODUCTS, 'productImage', 'imagen del producto'),
    uploadFile
);

// 3. Subida específica para AVATARES de usuario
router.post('/upload/avatar',
    createUploadFileMiddleware(UPLOAD_PATHS.AVATARS, 'avatar', 'avatar'),
    uploadFile
);

// 4. Subida múltiple para PRODUCTOS (campo: 'productImages')
router.post('/upload-multiple/product',
    createUploadMultipleMiddleware(UPLOAD_PATHS.PRODUCTS, 'productImages', 'imágenes del producto'),
    uploadFile
);

// 5. Subida múltiple genérica (campo: 'files')
router.post('/upload-multiple',
    createUploadMultipleMiddleware(UPLOAD_PATHS.DEFAULT, 'files', 'archivos'),
    uploadFile
);


// ==========================================
// Rutas de ELIMINACIÓN (Delete)
// ==========================================
// Nota: La eliminación no necesita saber la carpeta, porque el path completo
// ya está guardado en la base de datos (campo: file.path)

router.delete('/batch', deleteMultipleFiles);
router.delete('/:id', deleteFile);

export default router;
