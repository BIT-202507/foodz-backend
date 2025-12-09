import { model, models, Schema } from 'mongoose';

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
    type: {
        type: Schema.Types.ObjectId,
        ref: 'UnitType',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UnitModel = models.Unit || model('Unit', UnitSchema);

export default UnitModel;