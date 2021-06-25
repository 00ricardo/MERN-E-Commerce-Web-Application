import moongose from 'mongoose'
const connectDB = async () => {
    try {
        const conn = await moongose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error in connection: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB