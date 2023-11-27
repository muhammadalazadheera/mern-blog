const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @DESC    CREATE A NEW USER
// @ROUTE   POST api/user/register
// @ACCESS  PUBLIC 
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    // CHECK EMPTY FIELDS
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all the fields');
    }

    // CHECK EXISTING EMAIL
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('This email is already taken')
    }

    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE A NEW USER
    const newUser = await User.create({name, email, password: hashedPassword});

    if(newUser){
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: webtoken(newUser.email)
        })
    }else{
        res.status(400);
        throw new Error('Something went wrong. Please try again')
    }
})

// @DESC    LOGIN/AUTHENTICATE A USER
// @ROUTE   POST api/user/login
// @ACCESS  PUBLIC 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // MATCH THE EMAIL
    const user = await User.findOne({email});

    // MATCH THE PASSWORD
    if(user && (bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: webtoken(user.id) 
        })
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

// @DESC    GET USER INFORMATION
// @ROUTE   GET api/user/me
// @ACCESS  PUBLIC 
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    });
});

// FUNCTION FOR GENERATING JSON WEB TOKEN
const webtoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}