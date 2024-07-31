const { userService } = require("../services");
const {StatusCodes}=require('http-status-codes');

async function signup(req,res){
    try {
        const user=await userService.create({
            email:req.body.email,
            password:req.body.password
        })

        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:'user registered successfully',
            error:{},
            data:user
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:'user registeration failed',
            error:error,
            data:{}
        });
    }
}

module.exports={
    signup
}