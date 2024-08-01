const { StatusCodes } = require('http-status-codes');
const {UserRepository}=require('../repositories');
const AppError = require('../utils/errors/app.error');
const { checkPassword, createToken } = require('../utils/auth');
const userRepo=new UserRepository();
//data :{email ,password}

async function create(data){
    try {
        const user =await userRepo.create(data);
        return user;
    } catch (error) {
        console.log(error);
    }
}


async function signin(data){
    try {
        const user=await userRepo.getUserBYEmail(data.email);
        if(!user){
            throw new AppError('No user found with the given email',StatusCodes.NOT_FOUND);
        }
        const passwordMatch=checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError('Invalid Password',StatusCodes.BAD_REQUEST);
        }
        const jwt=createToken({id:user.id,email:user.email});

        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    create,
    signin
}