import { Schema, model } from 'mongoose';

const MealPlanSchema = new Schema({
    // Usuario dueño de esta planificación de comidas
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // Array con las elecciones de comida del usuario (Agenda)
    selections: [{
        // Fecha para la cual se programa la comida
        date: {
            type: Date,
            required: true
        },
        // Plato seleccionado para ese día
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        // Estado de la entrega de ese plato específico
        status: {
            type: String,
            enum: ['scheduled', 'preparing', 'delivered', 'cancelled'],
            default: 'scheduled'
        },
        // (Opcional) Dirección de entrega alternativa para este día específico
        deliveryAddress: {
            type: String,
            trim: true
        },
        // (Opcional) Notas adicionales para la cocina (Ej: "Sin cebolla")
        notes: {
            type: String,
            trim: true
        }
    }]
}, {
    timestamps: true,
    versionKey: false
});

const MealPlanModel = model('MealPlan', MealPlanSchema);

export default MealPlanModel;
