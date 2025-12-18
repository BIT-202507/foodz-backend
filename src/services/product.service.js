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
const dbGetAllProducts = async ({ category, type, status, search } = {}) => {
    const filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    return await ProductModel.find(filter).populate('category');
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
 * Elimina (soft delete) un producto cambiando su estado a 'inactive'.
 * @param {string} id - ID del producto.
 */
const dbDeleteProduct = async (id) => {
    return await ProductModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
}

export {
    dbCreateProduct,
    dbGetAllProducts,
    dbGetProductById,
    dbUpdateProduct,
    dbDeleteProduct
};
