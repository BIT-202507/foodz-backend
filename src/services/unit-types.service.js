import UnitTypeModel from "../models/Unit/UnitType.model.js";

const dbRegisterUnitTypes = async (newTypeUnit) => {
    return await UnitTypeModel.create(newTypeUnit);
}

const dbGetAllUnitTypes = async () => {
    return await UnitTypeModel.find({});
}

const dbGetUnitTypeById = async ( _id ) => {
    return await UnitTypeModel.findOne({ _id });
}

const dbGetUnitTypeByName = async ( name ) => {
    return await UnitTypeModel.findOne({ name });
}

const dbDeleteUnitTypeById = async ( _id ) => {
    return await UnitTypeModel.findByIdAndDelete( _id );
}

const dbDeleteUnitTypeByName = async ( name ) => {
    return await UnitTypeModel.findOneAndDelete({ name });
}


export {
    dbRegisterUnitTypes,
    dbGetAllUnitTypes,
    dbGetUnitTypeById,
    dbGetUnitTypeByName,
    dbDeleteUnitTypeById,
    dbDeleteUnitTypeByName
}