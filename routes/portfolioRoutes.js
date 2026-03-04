import express from "express";
import Portfolio from "../models/portfolioSchema.js" 

const router = express.Router();

//Create
router.route('/buy')
.put(async (req,res) =>{
    const {userId, assetId, quantity, price} = req.body
    try{
        let portfolio = await Portfolio.findOne({user: userId});
        //If Portfolio doesn't exist, create a new one
        if (!portfolio){
            portfolio = new Portfolio({
                user: userId,
                holdings: [],
            })
        }
        //Checks if user already owns asset (needed for avg cost later)
        const assetExists = portfolio.holdings.find(
            h => h.asset.toString() === assetId
        )

        if (assetExists){
            //Calculate new avg cost
            const totalCost = assetExists.avgPrice *assetExists.totalAmount + price * quantity;
            assetExists.totalAmount +=quantity;
            assetExists.avgPrice = totalCost / assetExists.totalAmount;
        } else {
            //if stock is not in portfolio, add to potfolio
            portfolio.holdings.push({
                asset: assetId,
                totalAmount: quantity,
                avgPrice: price,
            })
        }
        //Save Changes to db
        await portfolio.save();
        //return updates
        res.json(portfolio);
        

    } catch(err) {
        res.status(404).json({ error: err.message})
    }
})

//Read
//Route to get the User Portfolio
router.route('/userId')
.get(async (req,res) =>{
    try{
        let portfolio = await Portfolio.findOne({user: req.params.userId,})
        .populate("holdings.asset");

        if (!portfolio) {
            return res.status(400).json({nessage: 'Portfolio not found'})
        }
        res.json(portfolio);

    } catch(err) {
        return res.status(500).json({ error: message})
    }
})

//Update

//Delete

export default router;