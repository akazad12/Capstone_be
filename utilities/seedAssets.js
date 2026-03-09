import mongoose from "mongoose";
import axios from "axios";
import Asset from "../models/assetSchema.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const FKEY = process.env.FKEY

// Example list of top 15 NASDAQ stocks
const symbols = [
  "AAPL","MSFT","NVDA","AMZN","GOOGL",
  "META","TSLA","AVGO","COST","PEP",
  "ADBE","NFLX","CSCO","AMD","INTC",
];

async function seedAssets(){
    try{
        //connect database
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");

        //clear old assets
        await Asset.deleteMany({});
        console.log("Old assets removed");
        
        const assets = [];
        for (const symbol of symbols){
            //Finnhub Api Call
            //This gives static data
            const staticResponse = await axios.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FKEY}`
            );
            // This gives realtime data
            const dynamicResponse = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FKEY}`
            );
            const AssetInfo = staticResponse.data;
            const AssetCurrent = dynamicResponse.data;

            assets.push({
                symbol: AssetInfo.ticker,
                name: AssetInfo.name,
                exchange: AssetInfo.exchange,
                sector: AssetInfo.finnhubIndustry,
                marketCap: AssetInfo.marketCapitalization,
                currentPrice: AssetCurrent.c
            });
            console.log(`Fetched ${symbol}`);
        }
        
        await Asset.insertMany(assets);
        console.log(`Inserted ${assets.length} assets`);
        process.exit(1)
    } catch(err){
        console.error(err);
        process.exit(1)
    }
}
seedAssets()