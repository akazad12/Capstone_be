import express from "express";
import Asset from "../models/assetSchema.js";
import axios from "axios"
// import dotenv from "dotenv"

const router = express.Router();

const FKEY = process.env.FKEY;

//Create an asset
router
  .route("/")
  .post(async (req, res) => {
  //   try {
  //     const asset = await Asset.create(req.body);
  //     res.json(asset)
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // })
        try{
          const {symbol} = req.body;
          //Checks symbol is inputed by the user
          if(!symbol) {
            return res.status(400).json({message: "Symbol is required"});
          }
          //Checks if asset already exists
          const assetExists = await Asset.findOne({symbol});
          if (assetExists) {
            return res.json(assetExists);
          }
          //Finnhub Api Call
          //This gives static data
          const profile = await axios.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FKEY}`
          )
          //This gives realtime data
           const quote = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FKEY}`
          )
          const data = profile.data;
          if (!data.name) {
            return res.status(404).json({ message: "Invalid symbol" });
          }

          const assetData = {
            symbol: symbol.toUpperCase(),
            name: data.name,
            type: "STOCK", //++++++++++++++++Temporary place holder type has to be dynamic +++++++++++++++
            exchange: data.exchange,
            currentPrice: quote.data.c,
            marketCap: data.marketCapitalization,
            sector: data.finnhubIndustry || "Unknown"
          }
          const asset = await Asset.create(assetData);
          res.json(asset);
        }catch (err) {
        res.status(500).json({ error: err.message });
      }
    })

  //Get all assets
  .get(async (req, res) => {
    try {
      const assets = await Asset.find();
      res.json(assets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  //REFRESHES all  STOCK PRICES
router
.route("/refresh")
.put(async(req,res) =>{
  try{
    const assets = await Asset.find();
    for (const asset of assets) {
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${asset.symbol}&token=${FKEY}`
      );
    asset.currentPrice = quote.data.c;
    await asset.save();
    }
  res.json({message: "Price is updated"})
  } catch(err){
    res.json({error: err.message})
  }
})
  
router
 .route("/:id")
//update single asset
 .put(async (req,res) =>{
    try{
        const asset = await Asset
        .findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true} //only returns modified data
        );
        res.json(asset)
    }  catch (err) {
    res.status(500).json({ error: err.message });
    }
})
//Get single asset
.get(async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found " });
    res.json(asset);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
})

//delete single asset
.delete(async(req,res)=>{
    try{
      const asset = await Asset.findByIdAndDelete(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: "Asset does not exist" });
      }
      res.json({message: "Asset deleted"});
    } catch(err){
      res.status(500).json({ error: err.message });
    }
})

export default router;