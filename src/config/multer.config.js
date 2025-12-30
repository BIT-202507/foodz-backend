import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configuracion necesaria para usar __dirname en Módulos ES (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definimos la ruta donde se guardarán los archivos
// path.join combina segmentos de ruta de forma segura para el sistema operativo
// Estamos en /src/config, así que subir 2 niveles llega a la raíz del backend
const uploadDir = path.join(__dirname, '../../uploads');

// Verificamos si el directorio existe, si no, lo creamos
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento local (DiskStorage) de Multer
const storage = multer.diskStorage({
    // destination: Define DÓNDE se guardarán los archivos
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    // filename: Define CÓMO se llamará el archivo guardado
    filename: function (req, file, cb) {
        // Generamos un nombre único usando la fecha actual + un numero random
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para validar qué archivos permitimos subir
const fileFilter = (req, file, cb) => {
    // Aceptar solo imagenes (mimetypes que empiecen por 'image/')
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen!'), false);
    }
};

// Inicializamos Multer con la configuración definida
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de tamaño: 5MB
    }
});

export default upload;
