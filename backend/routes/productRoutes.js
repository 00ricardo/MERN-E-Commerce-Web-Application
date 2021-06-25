import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../DBModels/productModel.js'

const router = express.Router()


// @description Fetch all products
// @route Fetch GET /api/products
// @acess Public
router.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @description Fetch a single product
// @route Fetch GET /api/products/:id
// @acess Public
router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }

}))

export default router