import { Schema, model } from 'mongoose';

// Creando una instancia del esquema de entidad User
const productSchema = new Schema();

// Crear el modelo Product basado en el esquema productSchema
const productModel = model(
    'products',            // Nombre de la coleccion en singular 'Product'
    productSchema          // Esquema asociado al modelo
); 

// Exportando el modelo User, para que sea usado en otras partes de la aplicacion
export default productModel;