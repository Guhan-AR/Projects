const Product = require('../models/productModel');

exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        successs : true,
        message : "This route will show all the products in database"
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
