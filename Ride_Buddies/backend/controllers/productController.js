const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

//Get products - http://localhost:8000/api/v1/products
exports.getProducts =async (req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success : true,
        // message : "This route will show all the products in database"
        count : products.length,
        products
    })
}

//create product - http://localhost:8000/api/v1/product/new
exports.newProduct =async (req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

//Get Single Product - http://localhost:8000/api/v1/product/:id
exports.getSingleProduct = async(req,res,next)=>{
    const product =await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler('Product not found test',400));
        // return res.status(404).json({
        //     success: false,
        //     message : "Product not found"
        // });
    }
    res.status(201).json({
        success: true,
        product
    })
}

//Update Product - http://localhost:8000/api/v1/product/:id
exports.updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if (!product){
        return res.status(404).json({
            success: false,
            message : "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true

    })
    res.status(200).json({
        success:true,
        product
    })
}

//Delete Product - http://localhost:8000/api/v1/product/:id
exports.deleteProduct = async (req,res,next) => {
    const product =await Product.findById(req.params.id);

    if (!product){
        return res.status(404).json({
            success: false,
            message : "Product not found"
        });
    }
    await Product.findByIdAndDelete();
    res.status(200).json({
        success:true,
        message:"Product Deleted"
    });
}