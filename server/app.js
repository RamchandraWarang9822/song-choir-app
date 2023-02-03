const express = require('express');
const app = express();
require('dotenv').config();

//Connect to the database
require('./db/connectDB');
app.use(express.json());
app.use(require('./routes/routes'));


app.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});