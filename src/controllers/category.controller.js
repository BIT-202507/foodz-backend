import { MAX_CATEGORY_LEVEL } from "../config/global.config.js";
import { dbCreateCategory, dbGetCategoryById } from "../services/category.service.js";

const createCategory = async (req, res) => {
    try {
        // Paso 1: Obtener los datos de la peticion
        const inputData = req.body;
        const { name, parent_id, description } = inputData;

        // Paso 2: Definir el nivel por defecto
        let level = 0;  // Nivel por defecto, categoria principal

        // Paso 3: Validar que el parent_id exista, es decir: Que el id de la categoria padre exista para crear la sub-categoria
        if (parent_id) {
            // Paso 3.1: Verificar que la categoria padre esta registrada
            const parentCategory = await dbGetCategoryById(parent_id);

            if (!parentCategory) {
                return res.status(404).json({ msg: 'Parent category not found' });
            }

            // Paso 3.2: Incrementar el nivel de la categoria.
            level = parentCategory.level + 1;
        }

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


export {
    createCategory
}