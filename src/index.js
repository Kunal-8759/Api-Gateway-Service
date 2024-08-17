const express =require('express');
const { rateLimit } =require('express-rate-limit');

const {PORT}=require('./config/server.config');
const apiRouter = require('./routes');
const app=express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5, // Limit each IP to 3 requests per `window` (here, per 2 minutes).
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter)

app.listen(PORT,()=>{
    console.log(`Server started on Port : ${PORT}`);
})