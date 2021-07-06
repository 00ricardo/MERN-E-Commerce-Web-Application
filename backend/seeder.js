import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './DBModels/userModel.js'
import Order from './DBModels/orderModel.js'
import Product from './DBModels/productModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

/*
@@ This scripts were used to
@@ perform and automate loading 
@@ data to database 
*/

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users)
        const adminUser = createUsers[0]._id
        const sampleProducts = products.map(product => {    //isto retorna todos os produtos tal e qual está no product.js (...product) mas com um novo atributo (user)
            return { ...product, user: adminUser }          //reference to the adming system application
        })
        await Product.insertMany(sampleProducts)
        console.log('Data imported...')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed...')
        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
