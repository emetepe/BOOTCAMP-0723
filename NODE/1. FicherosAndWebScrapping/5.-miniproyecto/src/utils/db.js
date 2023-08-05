// Requerimos dotenv para poder acceder a las variables de entorno
const dotenv = require("dotenv");
dotenv.config();

// Requerimos mongoose para poder hacer la conexión con la db
const mongoose = require("mongoose");

// Importa la variable de entorno del .env
const MONGO_URI = process.env.MONGO_URI;

// Función que conecta
const connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Hacemos destructuring de esta conexión
        const {name, host} = db.connection;
        console.log(`Connected to db at host: ${host} with name: ${name}`);
    } catch (error) {
        console.log(`Unable to connect to db, ERROR: ${error}`);
    };
};
// Exportamos esta función
module.exports = { connect };
