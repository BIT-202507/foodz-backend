import ProductNutritionModel from "../models/Product/ProductNutrition.model.js";

/**
 * Obtiene la información nutricional de un producto.
 * @param {string} productId - ID del producto.
 */
const dbGetNutritionByProductId = async (productId) => {
    return await ProductNutritionModel.findOne({ product_id: productId });
}

/**
 * Crea o actualiza la info nutricional de un producto.
 * @param {string} productId - ID del producto.
 * @param {Object} nutritionData - Datos nutricionales.
 */
const dbUpsertNutrition = async (productId, nutritionData) => {
    return await ProductNutritionModel.findOneAndUpdate(
        { product_id: productId },
        { ...nutritionData, product_id: productId },
        { new: true, upsert: true }
    );
}

export {
    dbGetNutritionByProductId,
    dbUpsertNutrition
};
