import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const UnitTypeSchema = new Schema({
    name: {
        type: String,
        enum: ['mass', 'volume', 'culinary', 'nutritional'],
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UnitTypeModel = models.UnitType || model('Unit-Type', UnitTypeSchema);

export default UnitTypeModel;