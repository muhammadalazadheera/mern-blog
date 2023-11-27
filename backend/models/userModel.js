const mongoose = require('mongoose')
const {isEmail} = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'This email address is already taken'],
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }
},
{
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);