import express from 'express'
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productController.js'       //get the controllers (business login performed with the HTTP Requests)


router.route('/').get(getProducts)      //      /api/products/              -> /api/products used by express in server.js (prefix routes)
router.route('/:id').get(getProductById)//      /api/products/:id           -> /api/products used by express in server.js (prefix routes)


export default router