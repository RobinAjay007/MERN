const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

module.exports = (err,req,res,next)=>{
    
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        })
    }

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);
       
         // take error message and diplayed using map function
        if(err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message)
            error = new Error(message)
            err.statusCode = 400
        }
        // identify casterror wrong _id given means this error will displayed
        if(err.name == 'CastError'){
            message = `Resource not found: ${err.path}` ;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.code == 11000){
            console.log('in')
            let message= `Duplicate ${Object.keys(err.keyValue)} error`;
            error=new Error(message);
            err.statusCode=400;
        }

        if(err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }
        
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
}

}

