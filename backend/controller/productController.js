const { query } = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModels");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

// >>Create Product --Admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

// >> Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // return next(new ErrorHandler("Skinny Bitch!", 500));
    const productsCount = await Product.countDocuments();
    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
})

// >>Get Single Product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))

    }
    res.status(200).json({
        success: true,
        product
    })
})
// >> Get Product with keywords
exports.getProductDetailsByKeyword = catchAsyncError(async (req, res, next) => {
    const keyword = req.params.keyword;
    // console.log(Product.find());
    const products = await Product.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } }
        ]
    })
    if (!products) {
        return next(new ErrorHandler("Product Not Found", 404))

    }
    res.status(200).json({
        success: true,
        products
    })

})
// >> Update a Product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    res.status(200).json({
        success: true,
        product
    })
})
// >> Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    })
})
// >> Create a Review or Update the review
// * There is a serious bug, needed to be fixed. Can't write more that one review, and many funtionalities 
// * regarding reviews like "averageReviews" is also not working. It will create problems later.
// * Whenever I try to add a new review it throws this error "Cannot read properties of undefined (reading 'toString')"
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment)
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})
// >> Get all Reviews of the product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        review: product.reviews
    })
})

// >> Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        const ratings = avg / reviews.length;

    }
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
    })

})
