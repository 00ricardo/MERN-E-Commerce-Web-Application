import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler } from './handleErrors/errors.js'

const app = express()

dotenv.config()
connectDB()

app.use('/api/products', productRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}.`))
