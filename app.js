const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());



// Routes import
const userRoutes = require('./routes/user.route');
const errorMiddleware = require('./middlewares/error.middleware');
app.use('/user',userRoutes);


app.use('*',(req,res) => {
    res.status(404).send("OPPS!! 404 page not found")
})

app.use(errorMiddleware);


module.exports = app;
