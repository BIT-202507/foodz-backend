import { Schema, model } from 'mongoose';

const MembershipSchema = new Schema({
    // Referencia al Usuario que adquiere la membresía
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // Tipo de plan adquirido: Semanal, Mensual o Anual
    type: {
        type: String,
        enum: ['weekly', 'monthly', 'annual'],
        required: true
    },
    // Fecha en la que inicia la vigencia de la membresía
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    // Fecha en la que finaliza la vigencia (Calculada en base al tipo)
    endDate: {
        type: Date,
        required: true
    },
    // Estado actual de la suscripción (Activa, Vencida o Cancelada)
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    // (Opcional) Cantidad de créditos/comidas disponibles si el plan es por consumo
    credits: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

const MembershipModel = model('Membership', MembershipSchema);

export default MembershipModel;
