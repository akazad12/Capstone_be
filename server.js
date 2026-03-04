//Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, logReq} from "./middleware/middlewares.js"
import connectDB from "./db/conn.js"
import portfolioRoutes from "./routes/portfolioRoutes.js"


//Setups
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000;
connectDB();

//Middleware
app.use(express.json());
app.use(logReq);



//Routes
app.use("/api/portfolio",portfolioRoutes)


//Global Middleware
app.use(globalErr);


//Listener
app.listen(PORT,()=>{
    console.log(` Server is running on PORT: ${PORT}`)
})