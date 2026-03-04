//Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, logReq} from "./middleware/middlewares.js"
import portfolio from "./routes/portfolio.js"


//Setups
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(logReq);



//Routes
app.use("/api/portfolios",portfolio)


//Global Middleware
app.use(globalErr);


//Listener
app.listen(PORT,()=>{
    console.log(` Server is running on PORT: ${PORT}`)
})