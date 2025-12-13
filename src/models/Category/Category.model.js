import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        default: null
    },
    description: String,
    // Categoría padre (para subcategorías)
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    // El nivel 0 es la categoría principal: Se agrega para determinar el nivel de profundidad de la subcategoria
    level: {
        type: Number,
        default: 0
    },
    // Contador de subcategorias: Se agrega para validar si las categorias tienen elementos hijos
    childrenCount: {
        type: Number,
        default: 0
    },
    // Estos Ids deben registrarse automaticamente de acuerdo al usuario que se encuentra logueado
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Middleware: Antes de guardar, creamos un slug básico si no existe
// TODO: Eliminar acentos en el slug en caso de tenerlos
CategorySchema.pre('save', function () {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().split(' ').join('-');
    }
});


const CategoryModel = models.Category || model('Category', CategorySchema);

export default CategoryModel;