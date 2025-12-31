// Configuracion global para las categorias
// 0 es el nivel raiz, 1 es el primer sub-nivel, etc.
// Ejemplo: Si el maximo es 3, permite: Electronica (0) -> Celulares (1) -> Accesorios (2) -> Cables (3)
export const MAX_CATEGORY_LEVEL = 3;

export const ROLES = {
    ADMIN: 'admin',
    COLABORATOR: 'colaborator',
    REGISTERED: 'registered'
};

// Exporta una lista de roles
export const ALLOWED_ROLES = Object.values(ROLES);

// Configuración para subida de archivos
export const MAX_FILE_UPLOAD_LIMIT = 5;

// Rutas/Carpetas para subida de archivos
export const UPLOAD_PATHS = {
    PRODUCTS: 'products',
    AVATARS: 'avatars',
    DOCUMENTS: 'docs',
    DEFAULT: 'others'
};