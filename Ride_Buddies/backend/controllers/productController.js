const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const mongoose = require('mongoose');
const APIFeatures = require('../utils/apiFeatures');

// Get all products - http://localhost:8000/api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Product.find(),req.query).search();

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
});

// Create a new product - http://localhost:8000/api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
    console.log("Creating product...");
    const product = await Product.create(req.body);
    console.log("Product created", product);
    res.status(201).json({
        success: true,
        product
    });
});

// Get a single product by ID - http://localhost:8000/api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid Product ID', 400));
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Update product - http://localhost:8000/api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid Product ID', 400));
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete product - http://localhost:8000/api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid Product ID', 400));
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});
