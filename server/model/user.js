const mongoose = require('mongoose');

const User = mongoose.model("User", {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = User;