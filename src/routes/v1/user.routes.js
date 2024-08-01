const express=require('express');
const {userController}=require('../../controllers');
const { validateAuthRequest } = require('../../middlewares/authRequest.middleware');

const userRouter=express.Router();
userRouter.post('/signup',validateAuthRequest,userController.signup);
userRouter.post('/signin',validateAuthRequest,userController.signin);

module.exports=userRouter;