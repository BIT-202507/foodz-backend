// Mongoose ODM, ORM
const mongoose = require( 'mongoose' );

const MONGO_URI = 'mongodb://localhost:27017/db-foodz';


const dbConnection = async () => {
    try {
        await mongoose.connect( MONGO_URI, {} );
        console.log( 'Base de datos conectada exitosamente' );
    } 
    catch ( error ) {
        // console.error( error );
        console.error( 'Error al iniciar la base de datos ;( ' )
    }
}


module.exports = dbConnection;