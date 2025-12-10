import { dbRegisterUnit } from "../services/unit.service.js";

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


export {
    createUnit
}