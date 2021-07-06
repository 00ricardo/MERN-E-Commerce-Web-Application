import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'adming@example.com',
        password: bcrypt.hashSync('123456', 10),    //encrypting password with Synchronously Hash , lenght = 10 (not strong enough) -> should be at least 24
        isAdmin: true
    },
    {
        name: 'Ricardo',
        email: 'ricardo@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ealotico',
        email: 'ealotico@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users