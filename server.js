//Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr} from "./middleware/middlewares.js"


//Setups
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());


//Routes

//Global Middleware
app.use(globalErr);


//Listener
app.listen(PORT,()=>{
    console.log(` Server is running on PORT: ${PORT}`)
})