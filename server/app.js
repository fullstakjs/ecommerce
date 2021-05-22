const dotenv = require('dotenv');
const express = require('express');
const db = require("./db");
const cors = require("cors");
const analytic = require('./controller/getList');
const sign = require('./controller/sign');
dotenv.config();
const app = express();

const port = process.env.port || 2000;
app.use(cors());
app.use(express.json());
app.set(express.static('public'));
app.use("/", (req, res, next) => {
    console.log('request recieved at', new Date());
    next();
})
app.use("/", analytic);
app.use("/", sign);
// this method needs to be looked at 
app.use(express.static('client/build'));
if (db.connection) {
    app.listen(port, () => {
        console.log("App running on port........." + port);
    })
}