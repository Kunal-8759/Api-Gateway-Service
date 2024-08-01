const express=require('express');
const pingRouter = require('./pingCheck');
const userRouter = require('./user.routes');

const v1Router=express.Router();

v1Router.use('/ping',pingRouter);
v1Router.use('/user',userRouter);

module.exports=v1Router;


