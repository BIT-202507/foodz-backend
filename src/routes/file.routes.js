import { Router } from 'express';
import upload from '../middlewares/upload.middleware.js';
import { uploadFile } from '../controllers/file.controller.js';

const router = Router();

// Definimos la ruta POST para subir archivos
// 1er argumento: la ruta URL ('/upload')
// 2do argumento: el middleware 'upload.single', que procesa UN archivo
//                El string 'file' debe coincidir con el 'name' del input en el formulario frontend/postman
// 3er argumento: el controlador 'uploadFile', que se ejecuta SI el middleware fue exitoso
router.post('/upload', upload.single('file'), uploadFile);

// Nota: Para subir múltiples archivos a la vez, usaríamos:
router.post('/upload-multiple', upload.array('files', 5), uploadFile);
// Donde 'files' es el nombre del campo y 5 es el maximo de archivos permitidos

export default router;
