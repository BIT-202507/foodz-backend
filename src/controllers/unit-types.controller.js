import { dbDeleteUnitTypeById, dbDeleteUnitTypeByName, dbGetAllUnitTypes, dbGetUnitTypeById, dbGetUnitTypeByName, dbRegisterUnitTypes, dbUpdateUnitTypeById } from "../services/unit-types.service.js";

const registerUnitTypes = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Request Body:', inputData); // Debugging log

        const typeUnitRegistered = await dbRegisterUnitTypes(inputData);

        res.json({ typeUnitRegistered });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error: No se pudo registrar tipo de unidad' });
    }
}

const getAllUnitTypes = async (req, res) => {
    try {
        // Verificar si hay query params (ej: ?name=mass)
        const { name } = req.query;
        let unitTypes;

        if (name) {
            const found = await dbGetUnitTypeByName(name);
            unitTypes = found ? [found] : [];
        } else {
            unitTypes = await dbGetAllUnitTypes();
        }

        res.json({
            length: unitTypes.length,
            unitTypes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo obtener tipos de unidad' });
    }
}

const getUnitTypeById = async (req, res) => {
    try {
        const id = req.params.id;

        const unitTypeFound = await dbGetUnitTypeById(id);

        res.json({ unitTypeFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo obtener tipo de unidad por ID' });
    }
}

// getUnitTypeByName eliminado (integrado en getAllUnitTypes)

const deleteUnitTypeById = async (req, res) => {
    try {
        const id = req.params.id;

        const unitTypeDeleted = await dbDeleteUnitTypeById(id);

        res.json({ unitTypeDeleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo eliminar tipo de unidad por ID' });
    }
}

// deleteUnitTypeByName eliminado (se debe borrar por ID)

const updateUnitTypeById = async (req, res) => {
    try {
        const { body, params: { id } } = req;

        const unitTypeUpdated = await dbUpdateUnitTypeById(id, body);

        res.json({ unitTypeUpdated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo actualizar el tipo de unidad por ID' });
    }
}


export {
    registerUnitTypes,
    getAllUnitTypes,
    getUnitTypeById,
    deleteUnitTypeById,
    updateUnitTypeById
}