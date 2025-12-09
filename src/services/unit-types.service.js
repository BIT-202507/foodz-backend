import UnitTypeModel from "../models/Unit/UnitType.model.js";

const dbRegisterUnitTypes = async (newTypeUnit) => {
    return await UnitTypeModel.create(newTypeUnit);
}

const dbGetAllUnitTypes = async () => {
    return await UnitTypeModel.find({});
}


export {
    dbRegisterUnitTypes,
    dbGetAllUnitTypes
}