const express = require('express');
const color = require('colors')
const connectDB = require('./config/database')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandler');
const port = process.env.PORT || 8080
const app = express();
app.listen(port, () => console.log(`Server is running on port ${port}`));
connectDB();
// TO GET THE REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api', require('./routes/postRoutes'));

// Importing Middleware [MUST INCLUE UNDER ROUTES]
app.use(errorHandler)