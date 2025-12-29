import { Schema, model } from 'mongoose';

const DailyMenuSchema = new Schema({
    // Fecha específica para la cual aplica este menú (Ej: 2025-10-20)
    date: {
        type: Date,
        required: true,
        unique: true // Garantiza que solo exista un menú configurado por día
    },
    // Lista de platos (Productos) que estarán disponibles para elegir ese día
    availableDishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Product' // Relación con la colección de Productos (Platos)
    }],
    // Interruptor para activar/desactivar la visibilidad de este menú
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const DailyMenuModel = model('DailyMenu', DailyMenuSchema);

export default DailyMenuModel;
