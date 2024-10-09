const sendToken = (user,statusCode,res)=>{

    //creting jwt token
    const token=user.getJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        user
    })
}
module.exports = sendToken;