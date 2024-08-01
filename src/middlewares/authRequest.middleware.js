const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app.error");

function validateAuthRequest(req,res,next){
    if(!req.body.email){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:`something went wrong while authenticating user`,
            error:new AppError(`email not found`,StatusCodes.BAD_REQUEST),
            data:{}
        })
    }
    if(!req.body.password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:`something went wrong while authenticating user`,
            error:new AppError(`password not found`,StatusCodes.BAD_REQUEST),
            data:{}
        })
    }

    next();
}

module.exports={
    validateAuthRequest
}