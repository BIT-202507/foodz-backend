import { dbRegisterUnitTypes } from "../services/unit-types.service.js";

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


export {
    registerUnitTypes
}