import {
    dbDeleteCategoryById,
    dbGetAllCategories,
    dbGetCategoryById,
    dbRegisterCategory,
    dbUpdateCategoryById
} from "../services/category.service.js";

const createCategory = async (req, res) => {
    try {
        const inputData = req.body;

        const categoryRegistered = await dbRegisterCategory(inputData);

        res.json({ categoryRegistered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la categoría' });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await dbGetAllCategories();
        res.json({ length: categories.length, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las categorías' });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await dbGetCategoryById(id);

        res.json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener categoría por Id' });
    }
}

const getDeleteCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        const categoryDeleted = await dbDeleteCategoryById(id);

        res.json({ categoryDeleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar categoría por Id' });
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const categoryUpdated = await dbUpdateCategoryById(id, inputData);

        res.json({ categoryUpdated });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Error al actualizar categoría por Id' });
    }
}


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    getDeleteCategoryById,
    updateCategoryById
}
