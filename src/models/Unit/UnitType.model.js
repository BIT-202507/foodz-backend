import { model, models, Schema } from 'mongoose';

const UnitTypeSchema = new Schema({
    name: {
        type: String,
        enum: [ 'masa', 'volumen', 'culinarias', 'nutricionales' ],
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UnitTypeModel = models.UnitType || model( 'UnitType', UnitTypeSchema );

export default UnitTypeModel;