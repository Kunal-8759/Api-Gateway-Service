const express =require('express');
const {PORT}=require('./config/server.config');
const apiRouter = require('./routes');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter)

app.listen(PORT,()=>{
    console.log(`Server started on Port : ${PORT}`);
})