import express from 'express';
import WatchList from "../models/watchListSchema.js";

const router = express.Router({mergeParams: true});



//add stock to watchlist
router
.route("/:assetId")
.post(async(req,res)=>{
    try {
        const watchlist = await WatchList
        .findOneAndUpdate(
            {user: req.params.userId},
            {$addToSet: { stocks: req.params.assetId }},
            //if it assset doesn't exist in watchList, upsert inserts it
            {new: true, upsert: true}
        )
    res.json(watchlist)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Get users watchlist
router
.route("/")
.get(async(req,res)=>{
    try {
        const watchlist = await WatchList
        .findOne({ user: req.params.userId })
        .populate("stocks")
        .catch(err => { throw new Error(err) });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Remove stock from watch list
router.route('/:assetId')
.delete(async(req,res)=>{
    try{
        const watchlist = await WatchList
        .findOneAndUpdate(
            {user: req.params.userId},
            {$pull: { stocks: req.params.assetId }},
            {new: true}
        );
        res.json(watchlist)
    } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router


