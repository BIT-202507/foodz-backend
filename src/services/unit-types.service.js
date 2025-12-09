import UnitTypeModel from "../models/Unit/UnitType.model.js";

const dbRegisterTypeUnit = async (newTypeUnit) => {
    return await UnitTypeModel.create(newTypeUnit);
}


export {
    dbRegisterTypeUnit
}