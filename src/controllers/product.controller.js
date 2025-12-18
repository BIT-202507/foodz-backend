import {
    dbCreateProduct,
    dbGetAllProducts,
    dbGetProductById,
    dbUpdateProduct,
    dbDeleteProduct
} from "../services/product.service.js";

import {
    dbGetNutritionByProductId,
    dbUpsertNutrition
} from "../services/product-nutrition.service.js";

import {
    dbAddIngredient,
    dbGetIngredientsByProductId,
    dbRemoveIngredient
} from "../services/product-ingredient.service.js";

// ==========================================
// Product Core Controller
// ==========================================

/**
 * Crea un nuevo producto.
 */
const createProduct = async (req, res) => {
    try {
        const newProduct = await dbCreateProduct(req.body);
        res.status(201).json({ newProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error creating product', error: error.message });
    }
}

/**
 * Obtiene todos los productos con filtros opcionales.
 */
const getAllProducts = async (req, res) => {
    try {
        const filters = req.query; // category, type, status, search
        const products = await dbGetAllProducts(filters);
        res.json({ products });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting products' });
    }
}

/**
 * Obtiene un producto por ID.
 */
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await dbGetProductById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting product' });
    }
}

/**
 * Actualiza un producto.
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await dbUpdateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ updatedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error updating product' });
    }
}

/**
 * Desactiva un producto (Soft Delete).
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await dbDeleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product deactivated', deletedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error deleting product' });
    }
}

// ==========================================
// Product Nutrition Controller
// ==========================================

/**
 * Obtiene la info nutricional de un producto.
 */
const getProductNutrition = async (req, res) => {
    try {
        const { id } = req.params;
        const nutrition = await dbGetNutritionByProductId(id);
        res.json({ nutrition: nutrition || {} }); // Devuelve objeto vacio si no tiene info aun
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting nutrition info' });
    }
}

/**
 * Crea o actualiza la info nutricional.
 */
const updateProductNutrition = async (req, res) => {
    try {
        const { id } = req.params; // Product ID
        const nutrition = await dbUpsertNutrition(id, req.body);
        res.json({ nutrition });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error updating nutrition info' });
    }
}

// ==========================================
// Product Ingredient Controller
// ==========================================

/**
 * Agrega un ingrediente a un producto.
 */
const addProductIngredient = async (req, res) => {
    try {
        const { id } = req.params; // Product ID (Parent)
        // El body debe tener ingredient_id, quantity, unit, unitType...
        // Forzamos el product_id del path
        const ingredientData = { ...req.body, product_id: id };

        const newIngredient = await dbAddIngredient(ingredientData);
        res.status(201).json({ newIngredient });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error adding ingredient', error: error.message });
    }
}

/**
 * Obtiene los ingredientes de un producto.
 */
const getProductIngredients = async (req, res) => {
    try {
        const { id } = req.params;
        const ingredients = await dbGetIngredientsByProductId(id);
        res.json({ ingredients });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting ingredients' });
    }
}

/**
 * Elimina un ingrediente de la lista.
 * OJO: El ID aquí es el del registro ProductIngredient, NO el id del producto.
 */
const removeProductIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;
        await dbRemoveIngredient(ingredientId);
        res.json({ msg: 'Ingredient removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error removing ingredient' });
    }
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductNutrition,
    updateProductNutrition,
    addProductIngredient,
    getProductIngredients,
    removeProductIngredient
};
