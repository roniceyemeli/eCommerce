const express = require ('express');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}));
connectDB();


// routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/uploadRouter'));
app.use('/api', require('./routes/productRouter'));


const PORT = process.env.PORT ||5000;
app.listen(PORT, (error) => {
    error ? console.error(error) : console.log(`Your server is running on port ${PORT}`)
})