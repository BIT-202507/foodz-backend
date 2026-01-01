import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // El nombre debe ser único para evitar confusiones en el inventario/menú
        trim: true
    },
    description: String,
    // Relación con la categoría del producto
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    },
    // Tipo de producto: plato completo, ingrediente individual o complemento
    type: {
        type: String,
        enum: ['dish', 'ingredient', 'addon'],
        default: 'dish',
        required: true,
        index: true
    },
    // Lista de alérgenos presentes en el producto (ej: 'Gluten', 'Nueces')
    allergens: {
        type: [String],
        default: []
    },
    // Etiquetas dietéticas (ej: 'Keto', 'Vegano', 'Bajo en carbohidratos')
    dietary_tags: {
        type: [String],
        default: []
    },
    // Indica si el producto puede ser parte de un menú personalizado en la membresía
    is_customizable: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        index: true
    },
    image_url: String,
    preparation_time: Number,
    portion_size: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        index: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const ProductModel = models.Product || model('Product', ProductSchema);

export default ProductModel;