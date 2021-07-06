import moongose from 'mongoose'
const orderSchema = moongose.Schema({   //we are creating the schema -> skeleton of our collection 
    user: {
        type: moongose.Schema.Types.ObjectId,       //the order has associated an user (user id)
        required: true,
        ref: 'User'                                 //reference to the User Collection
    }, orderItems: [
        {
            name: {                     //product name
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: moongose.Schema.Types.ObjectId,   //the order has associated a list of products (product id)
                required: true,
                ref: 'Product'                  //reference to the Product Collection
            }
        }
    ],
    shippingAddres: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    }
}, {
    timestamps: true
})


const Order = moongose.model('Order', orderSchema)      //create an Model Order with the schema

export default Order