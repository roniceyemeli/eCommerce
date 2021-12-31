const mongoose = require('mongoose');
const config = require('config');
const db = config.get("db");

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        console.log('Database connected....')
    } catch (error) {
        console.error('error connecting to the database...')
    }
}

module.exports = connectDB;