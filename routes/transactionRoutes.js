import express from "express";
import Transaction from "../models/transactionSchema.js";

const router = express.Router();

//Create
router.route('/')
.post(async (req,res)=> {
    try{
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch(err){
        res.status(400).json({error: err.message})
    }
});
//Gets all the transactions for one user
router.route("/:portfolioId")
.get(async (req, res) => {
  try {
    const transactions = await Transaction.find({
      portfID: req.params.portfolioId
    }).populate("assetID");

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.route('/:id')
//Deletes a transaction
.delete(async(req,res)=>{
    try{
      const transaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction does not exist" });
      }
      res.json({message: "Transaction deleted"});
    } catch(err){
      res.status(500).json({ error: err.message });
    }
});

export default router;

