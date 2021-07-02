import expressAsyncHandler from 'express-async-handler'
import Product from '../DBModels/productModel.js'


// @description Fetch all products
// @route Fetch GET /api/products
// @acess Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @description Fetch a single product
// @route Fetch GET /api/products/:id
// @acess Public
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

export {
    getProducts,
    getProductById
}