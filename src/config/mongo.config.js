// Mongoose ODM, ORM
import mongoose from 'mongoose';

const MONGO_URI = process.env.DB_URI || 'mongodb://localhost:27017/db-foodz-default';

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log('Base de datos conectada exitosamente');
    }
    catch (error) {
        // console.error( error );
        console.error('Error al iniciar la base de datos ;( ')
    }
}

export default dbConnection;