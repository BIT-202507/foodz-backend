import { dbGetAllUnitTypes, dbRegisterUnitTypes } from "../services/unit-types.service.js";

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

const getAllUnitTypes = async ( req, res ) => {
    try {
        const unitTypes = await dbGetAllUnitTypes();

        res.json({ 
            length: unitTypes.length,
            unitTypes
        });
    } catch (error) {
        console.error( error );
        res.status(500).json({msg: 'Error: No se pudo obtener tipos de unidad' });
    }
}


export {
    registerUnitTypes,
    getAllUnitTypes
}