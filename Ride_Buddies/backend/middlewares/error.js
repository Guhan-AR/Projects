module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    
    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack:err.stack,
            error:err
        })}

    if(process.env.NODE_ENV == 'production'){
        res.status(err.statusCode).json({
            success:false,
            message:err.message
    })}
}