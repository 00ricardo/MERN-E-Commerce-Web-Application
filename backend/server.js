import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './handleErrors/errors.js'

const app = express()

dotenv.config()
connectDB()

app.use(express.json()) //it allows us to use JSON structure in POST requests @@IMPORTANT: it must be the first app.use defined
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}.`))
