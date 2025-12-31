import { Router } from 'express';
import { uploadSingle, uploadMultiple } from '../middlewares/upload.middleware.js';
import { uploadFile } from '../controllers/file.controller.js';

const router = Router();

// Definimos la ruta POST para subir archivos
// Usamos 'uploadSingle' que ya incluye la validación de errores 'moderna'
router.post('/upload', uploadSingle, uploadFile);

// Nota: Para subir múltiples archivos a la vez, usamos el middleware personalizado
// que ya incluye validación de errores y limites (definido en src/middlewares/upload.middleware.js)
router.post('/upload-multiple', uploadMultiple, uploadFile);

export default router;
