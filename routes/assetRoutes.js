import express from "express";
import Asset from "../models/assetSchema.js";

const router = express.Router();

//Create an asset
router
  .route("/")
  .post(async (req, res) => {
    try {
      const asset = await Asset.create(req.body);
      res.json(asset)
    } catch (err) {
      res.status(400).json({ error: err.message });
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


router
 .route("/:id")
//update single asset
 .put(async (req,res) =>{
    try{
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body,);
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
    res.status(500).json({ error: err.message });
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