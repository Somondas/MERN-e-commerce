const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter the Product description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter the Product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    image: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter the Product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter the Product Stock"],
        maxLength: [4, "Product stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: String,
        default: 0,
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User", 
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Products", productSchema);