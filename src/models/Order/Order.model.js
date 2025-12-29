import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    // Usuario 'Casual' que realiza la compra
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // Lista de items comprados en esta orden
    items: [{
        // Producto comprado
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        // Cantidad de unidades de este producto
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        // Precio unitario al momento de la compra (Para historial histórico)
        unitPrice: {
            type: Number,
            required: true
        }
    }],
    // Monto total a pagar por la orden
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    // Estado del proceso del pedido
    status: {
        type: String,
        enum: ['pending', 'paid', 'preparing', 'delivered', 'cancelled'],
        default: 'pending'
    },
    // Fecha y hora de creación del pedido
    date: {
        type: Date,
        default: Date.now
    },
    // Dirección física donde se entregará el pedido
    deliveryAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
