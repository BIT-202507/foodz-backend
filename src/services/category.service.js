import CategoryModel from "../models/Category/Category.model.js";

/**
 * Obtiene todas las categorías de la base de datos aplicando los filtros proporcionados.
 * @param {Object} filters - Filtros opcionales: parent_id, level, isActive, search
 */
const dbGetAllCategories = async ({ parent_id, level, isActive, search } = {}) => {
    const filter = {};

    if (parent_id) {
        filter.parent_id = parent_id;
    }

    if (level) {
        filter.level = level;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive;
    }

    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    return await CategoryModel.find(filter).populate('parent_id');
}

/**
 * Busca una categoría específica por su ID y puebla los datos del padre.
 * @param {string} id - ID de la categoría
 */
const dbGetCategoryById = async (id) => {
    return await CategoryModel.findById(id).populate('parent_id');
}

/**
 * Crea una nueva instancia del modelo Category (no la guarda aun).
 * @param {Object} newCategory - Datos de la nueva categoría
 */
const dbCreateCategory = (newCategory) => {
    return new CategoryModel(newCategory);
}

/**
 * Actualiza una categoría existente.
 * Incluye lógica de negocio:
 * 1. Validación de seguridad: No activar hijo si padre es inactivo.
 * 2. Cascada: Si se desactiva, desactivar hijos recursivamente.
 * @param {string} id - ID de la categoría
 * @param {Object} updateData - Datos a actualizar
 */
const dbUpdateCategory = async (id, updateData) => {
    // 1. Recuperar la categoria actual para validaciones
    const category = await CategoryModel.findById(id);
    if (!category) return null;

    // 2. Validacion: Si intentamos activar la categoria
    if (updateData.isActive === true && category.parent_id) {
        const parent = await CategoryModel.findById(category.parent_id);
        // Verificar si el padre existe y esta inactivo
        if (parent && !parent.isActive) {
            throw new Error('Cannot activate category: Parent category is inactive');
        }
    }

    // 3. Actualizar la categoria
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateData, { new: true });

    // 4. Cascada: Si se desactiva una categoria, desactivar tambien sus hijos
    if (updateData.isActive === false) {
        await deactivateChildren(id);
    }

    return updatedCategory;
}

/**
 * Función auxiliar recursiva para desactivar todas las subcategorías de un padre dado.
 * @param {string} parentId - ID de la categoría padre
 */
const deactivateChildren = async (parentId) => {
    const children = await CategoryModel.find({ parent_id: parentId });
    for (const child of children) {
        child.isActive = false;
        await child.save();
        await deactivateChildren(child._id);
    }
}

export {
    dbGetAllCategories,
    dbGetCategoryById,
    dbCreateCategory,
    dbUpdateCategory
}