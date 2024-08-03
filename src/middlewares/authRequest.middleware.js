const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app.error");
const { isAuthenticated } = require("../services/user.service");

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

async function checkAuth(req,res,next){
    try {
        const response= await isAuthenticated(req.headers['x-access-token']);

        console.log(response)
        if(response){
            //to access the all api will now use the token to authenticate
            req.user=response;//setting the user id in the req object
            next();
            
        }
    } catch (error) {
        return res.status(error.statusCode).json(error);
        
    }
}

module.exports={
    validateAuthRequest,
    checkAuth
}