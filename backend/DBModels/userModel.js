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

//this is a method to encrypt the password when an user is registering or updating his password in his profile 
userSchema.pre('save', async function (next) {      //here we are specifying that we wanna run this function before saving the user in database (pre save)
    if (!this.isModified('password')) {     // this is a MongoDB fucntion -> we must check if the 'password' (mongo db atributte from User collection) was modified from the original
        next()  //if nothing is modified, then next (pass)
    }
    const salt = await bcrypt.genSalt(10)     //mandatory to encrypt with hash
    this.password = await bcrypt.hash(this.password, salt)  //encrypting the password  (it receives the plaintext (this.password) and the number of rounds (salt))
})


const User = moongose.model('User', userSchema)

export default User