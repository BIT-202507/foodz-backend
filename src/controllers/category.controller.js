import {
    dbDeleteCategoryById,
    dbGetAllCategories,
    dbGetCategoriesByParentId,
    dbGetCategoryById,
    dbRegisterCategory,
    dbUpdateCategoryById
} from "../services/category.service.js";

const createCategory = async (req, res) => {
    try {
        const inputData = req.body;

        // Validar si es una subcategoría (tiene padre)
        if (inputData.parent) {
            const parentCategory = await dbGetCategoryById(inputData.parent);
            if (!parentCategory) {
                return res.status(404).json({ msg: 'La categoría padre no existe' });
            }
        }

        const categoryRegistered = await dbRegisterCategory(inputData);

        res.json({ categoryRegistered });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La categoría ya existe (nombre o slug duplicado)' });
        }
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

        if (!category) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        res.json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener categoría por Id' });
    }
}

const getDeleteCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        // Validar que la categoría exista
        const category = await dbGetCategoryById(id);
        if (!category) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        // Validar si tiene subcategorías
        const children = await dbGetCategoriesByParentId(id);
        if (children.length > 0) {
            return res.status(400).json({ msg: 'No se puede eliminar la categoría porque tiene subcategorías asociadas' });
        }

        const categoryDeleted = await dbDeleteCategoryById(id);

        res.json({ categoryDeleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar categoría por Id' });
    }
}

// Función auxiliar para detectar ciclos
const isAncestor = async (potentialAncestor, categoryId) => {
    let currentId = categoryId;
    while (currentId) {
        if (String(currentId) === String(potentialAncestor)) {
            return true;
        }
        const category = await dbGetCategoryById(currentId);
        if (!category || !category.parent) {
            break;
        }
        currentId = category.parent;
    }
    return false;
}

const updateCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        // Validar si la categoría a actualizar existe
        const categoryExists = await dbGetCategoryById(id);
        if (!categoryExists) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        // Si se actualiza el padre
        if (inputData.parent) {
            // Validar que el nuevo padre exista
            const newParent = await dbGetCategoryById(inputData.parent);
            if (!newParent) {
                return res.status(404).json({ msg: 'La categoría padre no existe' });
            }

            // Evitar auto-referencia
            if (String(id) === String(inputData.parent)) {
                return res.status(400).json({ msg: 'Una categoría no puede ser su propio padre' });
            }

            // Evitar ciclos: Verificar si 'id' es un ancestro del 'newParent'
            // Si yo soy ancestro de mi futuro padre, entonces mi futuro padre es mi descendiente -> Ciclo.
            if (await isAncestor(id, inputData.parent)) {
                return res.status(400).json({ msg: 'No se puede mover la categoría a una de sus subcategorías (Ciclo detectado)' });
            }
        }

        const categoryUpdated = await dbUpdateCategoryById(id, inputData);

        res.json({ categoryUpdated });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La categoría ya existe (nombre o slug duplicado)' });
        }
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
