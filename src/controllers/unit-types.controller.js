import { dbRegisterTypeUnit } from "../services/unit-types.service.js";

const registerTypeUnit = async (req, res) => {
    try {
        const inputData = req.body;

        const typeUnitRegistered = await dbRegisterTypeUnit(inputData);

        res.json({ typeUnitRegistered });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error: No se pudo registrar tipo de unidad' });
    }
}


export {
    registerTypeUnit
}