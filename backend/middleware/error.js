const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // >> MongoDB Invalid ID error

    if(err.name === "CastError"){
        const message = `Resouce not Found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400);
    }

    // >> Mongoose dublicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);

    }
    // >> JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400);

    }
     // >> JWT Expire error
     if(err.code === "TokenExpireError"){
        const message = `Json Web Token is expired, Try again`;
        err = new ErrorHandler(message, 400);

    }
    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}