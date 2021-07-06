import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign(
        { id },                     //we CANOT pass sensitive data here, we pass the user id
        process.env.JWT_SECRET,     //JWT_SECRET was created by myself randomly : https://passwordsgenerator.net/
        { expiresIn: '30d' }        //expires in 30 days) 
    )
}
//  @ Testing correctness JWToken
//  tests must be performed in POSTMAN such as we get a token
//  https://jwt.io/ to copy&paste the token and compare to the user id


export default generateToken