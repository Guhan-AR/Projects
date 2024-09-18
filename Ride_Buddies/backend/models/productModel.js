const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            Image: {
                type: String,
                required: [true,"please upload images"]
            }
        }
    ],
    category: {
        type: String,
        required: [true, "please,enter the category of the product"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Cloths/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please select correct category"

        },
        seller: {
            type: String,
            required: [true, "Please entre product seller name"]
        },
        stock: {
            type: Number,
            required: [true, "Please enter product stock"],
            maxLength: [20, "Product stock cannot exceed 20"]
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        review: [{
            name: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
        ],
        createdAt : {
            type : Date,
            default :  Date.now()
        }
    }
}
)

let schema = mongoose.model('Product',productSchema)

module.exports = schema