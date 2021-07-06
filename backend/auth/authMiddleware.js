import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../DBModels/userModel.js'


/*
@ This is for protecting routes
@ All the routes we wanna protect 
@ must have this protect call as 
@ parameter in the router

@ The protection is performed by the 
@ JWT and verified
*/


const protect = expressAsyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {      //we send the token with a prefix 'Baerer' in header request
        try {
            token = req.headers.authorization.split(' ')[1]  //get the token (Baerer <TOKEN>) -> [0] = 'Baerer' || [1] = TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET)               //verify with JWT the token passed and transform it to the a decoded token (user id)
            req.user = await User.findById(decoded.id).select('-password')          //for security issues we will set req.user the user information less his password (sensitive data)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed.') //this will fired when the token is wrong (doesnt match with the correct one)
        }
    }
    if (!token) {       //this will fired when the token is null (undefined)
        res.status(401)
        throw new Error('Not authorized, missing token.')
    }
})

export { protect }