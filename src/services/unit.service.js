import UnitModel from "../models/Unit/Unit.model.js";

const dbRegisterUnit = (newUnit) => {
    return UnitModel.create(newUnit);
}

const dbGetAllUnits = () => {
    return UnitModel.find();
}

const dbGetUnitById = (_id) => {
    return UnitModel.findById(_id);
}

const dbDeleteUnitById = (_id) => {
    return UnitModel.findByIdAndDelete(_id);
}

export {
    dbRegisterUnit,
    dbGetAllUnits,
    dbGetUnitById,
    dbDeleteUnitById
}