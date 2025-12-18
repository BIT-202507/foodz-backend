import UnitModel from "../models/Unit/Unit.model.js";

const dbRegisterUnit = (newUnit) => {
    return new UnitModel(newUnit);
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

const dbUpdateUnitById = (_id, unitUpdated) => {
    return UnitModel.findByIdAndUpdate(_id, unitUpdated, { new: true });
}


export {
    dbRegisterUnit,
    dbGetAllUnits,
    dbGetUnitById,
    dbDeleteUnitById,
    dbUpdateUnitById
}