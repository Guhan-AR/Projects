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
        type: Number,  // Changed to Number
        default: 0
    },
    images: [
        {
            image: {  // Corrected field name to lowercase 'image'
                type: String,
                required: [true, "Please upload images"]
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter the category of the product"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',  // Correct capitalization for input match
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
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller name"]
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
    reviews: [{  // Corrected the array name to "reviews"
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,  // Changed to Number for ratings
            required: true,
            min: [1, "Rating must be at least 1"],  // Added rating validation
            max: [5, "Rating cannot exceed 5"]
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
