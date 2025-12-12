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

// Función auxiliar para detectar "Ciclos" en la jerarquía de categorías.
// Un ciclo ocurre si intentamos hacer que un PADRE sea HIJO de su propio DESCENDIENTE.
// Ejemplo: Si A es padre de B, y B es padre de C... ¡No podemos hacer que C pase a ser padre de A!
// Eso crearía un bucle infinito (A -> B -> C -> A -> B...)
const isAncestor = async (potentialAncestor, categoryId) => {
    // Comenzamos a revisar desde la categoría actual (categoryId)
    let currentId = categoryId;

    // Mientras tengamos un ID que revisar...
    while (currentId) {
        // 1. Verificamos: ¿Es este "currentId" igual al "potentialAncestor"?
        // Si son iguales, significa que 'potentialAncestor' YA ESTABA ARRIBA en la jerarquía.
        // Por lo tanto, si intentamos ponerlo debajo, cerraríamos el círculo creando un ciclo.
        if (String(currentId) === String(potentialAncestor)) {
            return true; // ¡Se detectó un ciclo!
        }

        // 2. Obtenemos la información completa de la categoría actual para ver quién es su padre
        const category = await dbGetCategoryById(currentId);

        // Si la categoría no existe o ya llegamos a la raíz (no tiene padre), terminamos el bucle.
        if (!category || !category.parent) {
            break;
        }

        // 3. Subimos un nivel: Ahora vamos a chequear al PADRE de la categoría actual
        currentId = category.parent;
    }

    // Si terminamos el bucle y nunca encontramos coincidencia, NO es un ancestro. Todo está bien.
    return false;
}

const updateCategoryById = async (req, res) => {
    try {
        // 1. Obtener el ID de la categoría que queremos editar (viene en la URL)
        const id = req.params.id;
        // 2. Obtener los datos nuevos que envía el usuario (viene en el JSON del body)
        const inputData = req.body;

        // 3. PASO CRÍTICO: Validar que la categoría que queremos editar realmente exista en la BD.
        const categoryExists = await dbGetCategoryById(id);
        if (!categoryExists) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }

        // 4. Lógica Especial: ¿El usuario está intentando cambiar el Padre (Mover la categoría)?
        if (inputData.parent) {

            // 4.1. Validar que el NUEVO padre que eligieron realmente exista.
            // (No podemos ser hijos de una categoría fantasma)
            const newParent = await dbGetCategoryById(inputData.parent);
            if (!newParent) {
                return res.status(404).json({ msg: 'La categoría padre no existe' });
            }

            // 4.2. Evitar Auto-referencia:
            // Una categoría NO puede ser su propio padre. (Ej: "Frutas" no puede estar dentro de "Frutas")
            if (String(id) === String(inputData.parent)) {
                return res.status(400).json({ msg: 'Una categoría no puede ser su propio padre' });
            }

            // 4.3. Evitar Ciclos (La validación más compleja):
            // Verificamos si la categoría que estoy editando (id) es un "Abuelo" o "Ancestro" de la categoría donde la quiero meter (inputData.parent).
            // Si yo soy "Abuelo" de mi futuro "Padre", se crearía una paradoja temporal... digo, un bucle infinito en la base de datos.
            if (await isAncestor(id, inputData.parent)) {
                return res.status(400).json({ msg: 'No se puede mover la categoría a una de sus subcategorías (Ciclo detectado)' });
            }
        }

        // 5. Si pasamos todas las validaciones, procedemos a actualizar en la Base de Datos
        const categoryUpdated = await dbUpdateCategoryById(id, inputData);

        // 6. Respondemos con éxito
        res.json({ categoryUpdated });

    } catch (error) {
        console.error(error);
        // Manejo de error por duplicados (Código 11000 de MongoDB)
        // Esto pasa si intentan cambiar el nombre a uno que ya existe en otra categoría.
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La categoría ya existe (nombre o slug duplicado)' });
        }
        // Error genérico del servidor
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
