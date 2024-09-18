exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        successs : true,
        message : "This route will show all the products in database"
    })
}