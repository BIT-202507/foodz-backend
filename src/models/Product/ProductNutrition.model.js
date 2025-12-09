import { model, models, Schema } from 'mongoose';

const ProductNutritionSchema = new Schema({
    // Relación 1:1 con el producto
    // 'unique: true' crea un índice único que garantiza que solo exista UN registro nutricional por producto.
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
        required: true
    },
    calories: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    protein: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    carbs: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    fat: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    fiber: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    sodium: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    sugar: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
}, {
    timestamps: true,
    versionKey: false
});

const ProductNutritionModel = models.ProductNutrition || model('ProductNutrition', ProductNutritionSchema);

export default ProductNutritionModel;