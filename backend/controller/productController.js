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
exports.getAllProducts =catchAsyncError( async (req, res) => {
    const productCount = await Product.countDocuments(); 
    const resultPerPage = 5;
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount,
    })
})

// >>Get Single Product
exports.getProductDetails =catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
        
    }
    res.status(200).json({
        success: true,
        product
    })
})
// >> Update a Product --Admin
exports.updateProduct =catchAsyncError( async (req, res,next) => {
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
exports.deleteProduct =catchAsyncError( async (req, res, next) => {
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