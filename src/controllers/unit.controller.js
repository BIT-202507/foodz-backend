import UnitModel from '../models/Unit/Unit.model.js';

export const createUnit = async (req, res) => {
    try {
        const { name, symbol, type } = req.body;

        const newUnit = new UnitModel({ name, symbol, type });
        await newUnit.save();

        res.status(201).json(newUnit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUnits = async (req, res) => {
    try {
        const units = await UnitModel.find().populate('type');
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await UnitModel.findById(id).populate('type');

        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUnit = await UnitModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json(updatedUnit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUnit = await UnitModel.findByIdAndDelete(id);

        if (!deletedUnit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
