import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const ProductCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // Categoría padre (para subcategorías)
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        default: null
    },
    description: String,
}, {
    timestamps: true,
    versionKey: false
});

const ProductCategoryModel = models.ProductCategory || model('ProductCategory', ProductCategorySchema);

export default ProductCategoryModel;