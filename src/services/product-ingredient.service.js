import ProductIngredientModel from "../models/Product/ProductIngredient.model.js";

/**
 * Agrega un ingrediente a un producto.
 * @param {Object} ingredientData - Datos del ingrediente (product_id, ingredient_id, quantity, unit...).
 */
const dbAddIngredient = async (ingredientData) => {
    return await ProductIngredientModel.create(ingredientData);
}

/**
 * Obtiene todos los ingredientes de un producto.
 * @param {string} productId - ID del producto padre.
 */
const dbGetIngredientsByProductId = async (productId) => {
    return await ProductIngredientModel.find({ product_id: productId })
        .populate('ingredient_id')
        .populate('unit')
        .populate('unitType');
}

/**
 * Elimina un ingrediente de la lista de un producto.
 * @param {string} id - ID del registro en ProductIngredient.
 */
const dbRemoveIngredient = async (id) => {
    return await ProductIngredientModel.findByIdAndDelete(id);
}

export {
    dbAddIngredient,
    dbGetIngredientsByProductId,
    dbRemoveIngredient
};
