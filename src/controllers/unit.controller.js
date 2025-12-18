import { dbDeleteUnitById, dbGetAllUnits, dbGetUnitById, dbRegisterUnit, dbUpdateUnitById } from "../services/unit.service.js";

const createUnit = async (req, res) => {
    try {
        const inputData = req.body;

        const unitRegistered = await dbRegisterUnit(inputData);

        res.json({ unitRegistered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la unidad' });
    }
}

const getAllUnits = async (req, res) => {
    try {
        const units = await dbGetAllUnits();
        res.json({ length: units.length, units });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las unidades' });
    }
}

const getUnitById = async (req, res) => {
    try {
        const id = req.params.id;

        const unit = await dbGetUnitById(id);

        res.json({ unit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener unidad por Id' });
    }
}

const getDeleteUnitById = async (req, res) => {
    try {
        const id = req.params.id;

        const unitDeleted = await dbDeleteUnitById(id);

        res.json({ unitDeleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar unidad por Id' });
    }
}

const updateUnitById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const unitUpdated = await dbUpdateUnitById(id, inputData);

        res.json({ unitUpdated });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Error al actualizar unidad por Id' });
    }
}


export {
    createUnit,
    getAllUnits,
    getUnitById,
    getDeleteUnitById,
    updateUnitById
}