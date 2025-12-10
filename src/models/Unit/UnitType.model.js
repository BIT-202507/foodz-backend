import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const UnitTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UnitTypeModel = models.UnitType || model('UnitType', UnitTypeSchema);

export default UnitTypeModel;