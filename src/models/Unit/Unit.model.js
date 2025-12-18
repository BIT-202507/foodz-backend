import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const UnitSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        trim: true
    },
    // Relación con el tipo de unidad (ej: Masa, Volumen)
    unit_type: {
        type: Schema.Types.ObjectId,
        ref: 'UnitType',
        required: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UnitModel = models.Unit || model('Unit', UnitSchema);

export default UnitModel;