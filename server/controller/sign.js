const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//bring the user model
const User = require('../model/user')

const sign = express.Router();
//we will start with signup then login
sign.post('/signup', async (req, res) => {
    const body = req.body;

    if (!body.firstName) {
        return res.status(400).send({
            error: "first name required"
        })
    }
    if (!body.lastName) {
        return res.status(400).send({
            error: "last  name required"
        })
    }
    if (!body.email) {
        return res.status(400).send({
            error: "email required"
        })
    }
    if (!body.password) {
        return res.status(400).send({
            error: "password required"
        })
    }

    // createing a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));

});

sign.get('/signup', (req, res) => {

});
sign.get('/login', (req, res) => {
    res.send("loged in")
});

sign.post('/login', async (req, res) => {

    const body = req.body;
    const user = await User.findOne({
        email: body.email
    });
    if (user) {
        const accessTokenSecret = process.env.accessTokenSecret;
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            const accessToken = jwt.sign({
                username: user.username,
                role: user.role
            }, accessTokenSecret);

            res.status(200).json({
                accessToken,
                message: "Valid password"
            });
        } else {
            res.status(400).json({
                error: "Invalid Password"
            });
        }
    } else {
        res.status(401).json({
            error: "User does not exist"
        });
    }

});

module.exports = sign;