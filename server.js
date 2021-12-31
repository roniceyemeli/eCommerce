const express = require ('express');
// require('dotenv').config({path:"./config/.env"});
const connectDB = require('./config/connectDB');


const app = express();
app.use(express.json());
connectDB();


// routes
app.use('/user', require('./routes/userRouter'));


const PORT = process.env.PORT ||5000;
app.listen(PORT, (error) => {
    error ? console.error(error) : console.log(`Your server is running on port ${PORT}`)
})