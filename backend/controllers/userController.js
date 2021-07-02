import expressAsyncHandler from 'express-async-handler'
import User from '../DBModels/userModel.js'

// @description Auth user & get token
// @route POST /api/users/login
// @acess Public
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && await User.matchPassword(password)) {
        res.json({
            _id: user._id,
            email: user.email,
            isAdmin: isSecureContext.isAdmin,
            token: null
        })
    } else {
        res.status(401)
    }

})


export {
    authUser
}