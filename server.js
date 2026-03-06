//Imports
import express from 'express';
import dotenv from 'dotenv';
import {globalErr, logReq} from "./middleware/middlewares.js";
import connectDB from "./db/conn.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import cors from "cors";

//Setups
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001;
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(logReq);



//Routes
app.use("/api/portfolio",portfolioRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assets",assetRoutes);
app.use('/api/transactions',transactionRoutes);
app.use('/api/watchList',watchListRoutes);



//Global Middleware
app.use(globalErr);


//Listener
app.listen(PORT,()=>{
    console.log(` Server is running on PORT: ${PORT}`)
})