import { MAX_CATEGORY_LEVEL } from "../config/global.config.js";
import { dbCreateCategory, dbGetAllCategories, dbGetCategoryById, dbUpdateCategory } from "../services/category.service.js";

/**
 * Crea una nueva categoría.
 * Calcula automáticamente el nivel (level) basándose en el padre.
 * Valida que no se exceda el nivel máximo permitido.
 */
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

/**
 * Obtiene el listado de categorías.
 * Procesa los query params (search, is_active, parent_id, level) y los pasa al servicio.
 */
const getAllCategories = async (req, res) => {
    try {
        // Paso 2: Preparar filtros de busqueda
        const { level, parent_id, is_active, search } = req.query;

        const filters = {
            level,
            parent_id,
            search
        };

        // Convertir query param string a boolean real
        if (is_active !== undefined) {
            filters.isActive = (is_active === 'true');
        }

        // Paso 3: Consultar las categorias pasandole los filtros limpios al servicio
        const categories = await dbGetAllCategories(filters);

        // Paso 4: Responder al cliente
        res.json({ categories });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error getting categories' });
    }
}

/**
 * Obtiene los detalles de una categoría específica buscando por su ID.
 */
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

/**
 * Actualiza una categoría existente.
 * Maneja errores de validación específicos (como activar hijo de padre inactivo) retornando 400.
 */
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedCategory = await dbUpdateCategory(id, updateData);

        if (!updatedCategory) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        res.json({ updatedCategory });
    } catch (error) {
        console.error(error.message);
        // Si el error es de validacion (nuestro throw), enviamos 400, sino 500
        if (error.message.includes('Cannot activate category')) {
            return res.status(400).json({ msg: error.message });
        }
        res.status(500).json({ msg: 'Error updating category' });
    }
}

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
}