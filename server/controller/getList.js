const express = require("express");

const analytics = express.Router();

analytics.get('/', (req, res) => {
    res.send('hello mody');
})

module.exports = analytics;