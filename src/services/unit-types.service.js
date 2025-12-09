import UnitTypeModel from "../models/Unit/UnitType.model.js";

const dbRegisterUnitTypes = async (newTypeUnit) => {
    return await UnitTypeModel.create(newTypeUnit);
}


export {
    dbRegisterUnitTypes
}