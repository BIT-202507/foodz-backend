import { dbGetAllUnits, dbGetUnitById, dbRegisterUnit } from "../services/unit.service.js";

const createUnit = async (req, res) => {
    try {
        const inputData = req.body;

        const unitRegistered = await dbRegisterUnit(inputData);

        res.json({ unitRegistered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la unidad' });
    }
}

const getAllUnits = async (req, res) => {
    try {
        const units = await dbGetAllUnits();
        res.json({ length: units.length, units });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las unidades' });
    }
}

const getUnitById = async (req, res) => {
    try {
        const id = req.params.id;

        const unit = await dbGetUnitById(id);

        res.json({ unit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la unidad' });
    }
}


export {
    createUnit,
    getAllUnits,
    getUnitById
}