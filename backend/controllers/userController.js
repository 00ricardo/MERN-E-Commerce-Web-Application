import expressAsyncHandler from 'express-async-handler'
import generateToken from '../auth/generateToken.js'
import User from '../DBModels/userModel.js'

// @description Auth user & get token
// @route POST /api/users/login
// @acess Public

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {     //checking if a user was found (email matchs) and checking the comparison between the plaintext password (password) with the password in DB (encrypted by bcrypt)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)      //we are calling back generateToken passing the user id (no sensitive data) to perform Authorization
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password.')
    }
})

// @description Get the user profile
// @route GET /api/users/profile
// @acess Private - Acess req.user is only available by the protect function 
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)          //this req.user._id is actually a middleware we created (protected)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @description Register a new user
// @route POST /api/users
// @acess Public

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400)
        throw new Error('User already registered.')
    }
    const user = await User.create({
        name: name,
        email: email,
        password: password,
        isAdmin: false
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})



export {
    authUser,
    getUserProfile,
    registerUser
}