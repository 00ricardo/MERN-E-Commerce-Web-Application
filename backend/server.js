import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './handleErrors/errors.js'

dotenv.config()
connectDB()

/*
------------------------  /  /  ------------------------------------
*/

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) //it allows us to use JSON structure in POST requests @@IMPORTANT: it must be the first app.use defined
app.use('/api/products', productRoutes)     //prefix /api/products
app.use('/api/users', userRoutes)           //prefix /api/users
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on port ${PORT}.`))
