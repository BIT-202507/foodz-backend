import UnitModel from "../models/Unit/Unit.model.js";

const dbRegisterUnit = (newUnit) => {
    return UnitModel.create(newUnit);
}


export {
    dbRegisterUnit
}