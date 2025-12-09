import { dbGetAllUnitTypes, dbGetUnitTypeById, dbGetUnitTypeByName, dbRegisterUnitTypes } from "../services/unit-types.service.js";

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

const getUnitTypeById = async ( req, res ) => {
    try {
        const id = req.params.id;

        const unitTypeFound = await dbGetUnitTypeById( id );

        res.json({ unitTypeFound });
    } catch (error) { 
        console.error( error );
        res.status(500).json({ msg: 'Error: No se pudo obtener tipo de unidad por ID' });
    }
}

const getUnitTypeByName = async ( req, res ) => {
    try {
        const name = req.params.name;

        const unitTypeFound = await dbGetUnitTypeByName( name );

        res.json({ unitTypeFound });
    } catch (error) {
        console.error( error );
        res.status(500).json({ msg: 'Error: No se pudo obtener tipo de unidad por nombre' });
    }
}

export {
    registerUnitTypes,
    getAllUnitTypes,
    getUnitTypeById,
    getUnitTypeByName
}