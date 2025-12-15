import { MAX_CATEGORY_LEVEL } from "../config/global.config.js";
import { dbCreateCategory, dbGetAllCategories, dbGetCategoryById } from "../services/category.service.js";

const createCategory = async (req, res) => {
    try {
        // Paso 1: Obtener los datos de la peticion
        const inputData = req.body;
        const { name, parent_id, description } = inputData;

        // Paso 2: Obtener la categoria padre si existe
        const parentCategory = parent_id ? await dbGetCategoryById(parent_id) : null;

        // Paso 3: Validar y actualizar padre
        if (parent_id) {
            if (!parentCategory) {
                return res.status(404).json({ msg: 'Parent category not found' });
            }

            // Actualizar el contador de subcategorias, incrementa el contador en 1 si el padre existe
            parentCategory.childrenCount += 1;
            await parentCategory.save();
        }

        // Actualiza el nivel de la categoria, si existe una categoria padre, incrementa el nivel en 1, de lo contrario, el nivel es 0
        const level = parentCategory ? parentCategory.level + 1 : 0;

        // Paso 4: Validar que el nivel no exceda el maximo permitido
        if (level > MAX_CATEGORY_LEVEL) {
            return res.status(400).json({ msg: 'Max category level exceeded' });
        }

        // Paso 5: Registrar la categoria/sub-categoria
        const newCategory = dbCreateCategory({ name, parent_id, description, level });
        await newCategory.save();

        // Paso 6: Responder al cliente
        res.status(201).json({ newCategory });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error creating category' });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await dbGetAllCategories();

        res.json({ categories });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting categories' });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await dbGetCategoryById(id);

        res.json({ category });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error: gettint category by id' });
    }
}



export {
    createCategory,
    getAllCategories,
    getCategoryById
}