const { StatusCodes } = require('http-status-codes');
const {UserRepository}=require('../repositories');
const AppError = require('../utils/errors/app.error');
const { checkPassword, createToken, verifyToken } = require('../utils/auth');

const userRepo=new UserRepository();

//this is for signup process
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

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT token',StatusCodes.BAD_REQUEST);
        }
        const response = verifyToken(token);//as we create the token using {id,email} so in respnse we get the same
        
        //lets say once user is signedIn but then they delete their profile and then they are again want to access the api 
        //using the same token then we have to handle this case
        const user=await userRepo.get(response.id);
        if(!user){
            throw new AppError('User Not Found',StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something Went Wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    create,
    signin,
    isAuthenticated
}