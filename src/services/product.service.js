import ProductModel from "../models/Product/Product.model.js";

/**
 * Crea un nuevo producto.
 * @param {Object} productData - Datos del producto.
 */
const dbCreateProduct = async (productData) => {
    return await ProductModel.create(productData);
}

/**
 * Obtiene productos con filtros: category, type, status, search.
 * @param {Object} filters - Filtros de búsqueda.
 */
/**
 * Obtiene productos con filtros y paginación.
 * @param {Object} query - Query params que incluye filtros y paginación.
 */
const dbGetAllProducts = async ({ category, type, status, search, page = 1, limit = 10 }) => {
    // Paso 1: Inicializar el Objeto de Filtros
    // Se comienza vacio y se agregan propiedades dinamicamente segun lo recibido.
    const filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    // Paso 2: Configurar la Paginación
    // Convertir a numeros enteros por seguridad, ya que vienen como strings desde la URL.
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Calcular el 'skip' (desplazamiento).
    // Formula: (Pagina Actual - 1) * Elementos por pagina
    // Ej: Pagina 1 -> (1-1)*10 = 0 (No saltar nada)
    // Ej: Pagina 2 -> (2-1)*10 = 10 (Saltar los primeros 10)
    const skip = (pageNum - 1) * limitNum;

    // Paso 3: Consultas a la Base de Datos (Paralelo)
    // Usamos Promise.all para ejecutar ambas consultas al mismo tiempo y ganar performance.

    const [products, totalDocs] = await Promise.all([
        // Consulta A: Obtener los datos paginados
        ProductModel.find(filter)
            .populate('category') // Traer datos de la relacion Category
            .limit(limitNum)      // Limitar la cantidad de resultados
            .skip(skip),          // Saltar los resultados anteriores

        // Consulta B: Contar el total de documentos que coinciden con el filtro
        // Esto es necesario para saber cuantas paginas hay en total.
        ProductModel.countDocuments(filter)
    ]);

    // Paso 4: Calcular metadatos de paginación
    const totalPages = Math.ceil(totalDocs / limitNum); // Total items / items por pagina (Redondeado arriba)
    const hasNextPage = pageNum < totalPages;           // Hay siguiente si pagina actual < total
    const hasPrevPage = pageNum > 1;                    // Hay anterior si no estamos en la pagina 1

    // Paso 5: Retornar estructura completa
    return {
        products,           // Los productos de esta pagina
        totalDocs,          // Total de productos disponibles (con estos filtros)
        limit: limitNum,    // Limite usado
        page: pageNum,      // Pagina actual
        totalPages,         // Total de paginas
        hasNextPage,        // Verdadero si hay mas paginas
        hasPrevPage         // Verdadero si hay paginas atras
    };
}

/**
 * Obtiene un producto por ID.
 * @param {string} id - ID del producto.
 */
const dbGetProductById = async (id) => {
    return await ProductModel.findById(id).populate('category');
}

/**
 * Actualiza un producto.
 * @param {string} id - ID del producto.
 * @param {Object} productData - Datos a actualizar.
 */
const dbUpdateProduct = async (id, productData) => {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
}

/**
 * Elimina (hard delete) un producto físicamente de la BD.
 * @param {string} id - ID del producto.
 */
const dbHardDeleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}

/**
 * Alterna el estado de un producto (Soft Delete / Reactivación).
 * @param {string} id - ID del producto.
 * @param {string} newStatus - Nuevo estado ('active' | 'inactive').
 */
const dbToggleProductStatus = async (id, newStatus) => {
    return await ProductModel.findByIdAndUpdate(id, { status: newStatus }, { new: true });
}

export {
    dbCreateProduct,
    dbGetAllProducts,
    dbGetProductById,
    dbUpdateProduct,
    dbHardDeleteProduct,
    dbToggleProductStatus
};
