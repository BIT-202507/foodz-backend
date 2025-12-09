import { model, models, Schema } from 'mongoose';

const ProductIngredientSchema = new Schema({
    // ID del producto principal (el plato)
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // ID del ingrediente que compone el plato (también es un documento de la colección Product)
    ingredient_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    // Relación con el tipo de unidad (ej: Masa, Volumen)
    unitType: {
        type: Schema.Types.ObjectId,
        ref: 'UnitType',
        required: true
    },
    // Relación con la unidad de medida específica (ej: Gramos, Litros)
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Índice compuesto único:
// Garantiza que no se pueda repetir el mismo ingrediente para el mismo producto.
// Evita duplicados como: "Ensalada César" con "Pollo" dos veces.
ProductIngredientSchema.index(
    { product_id: 1, ingredient_id: 1 },        // Campos del índice
    { unique: true }                            // Campos del índice
);

const ProductIngredientModel = models.ProductIngredient || model('ProductIngredient', ProductIngredientSchema);

export default ProductIngredientModel;