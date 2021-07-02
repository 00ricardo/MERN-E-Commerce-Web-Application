import moongose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = moongose.Schema({
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }, isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

//this is a method to decrypt the password and make sure that it matchs with the input password entered by the user
userSchema.methods.matchPassword = async function (input_password) {
    return await bcrypt.compare(input_password, this.password)  //this.password is the real password of the user (because we call this method (matchPassword) in a specific user)
}

const User = moongose.model('User', userSchema)

export default User