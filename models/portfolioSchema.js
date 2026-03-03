import mongoose from "mongoose";

const accountType = ["traditional", "modern"];

const portfolioSchema = new mongoose.Schema({
  portfID: {
    type: mongoose.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
  holdings: [
    { 
     asset: {
        type: mongoose.Types.ObjectId,
        ref: "Asset",
        required: true,
     },
      totalAmount: {
        type: Number,
        required: true,
        default: 0,
      },
      avgPrice: {
        type: Number,
        required: true,
        default: 0,
      }
      
    },
  ],
});

//indexes by name of person
portfolioSchema.index({ name: 1 });
//index by whether an account type is modern and if it is also manually managed by the company
portfolioSchema.index({ accountType: "modern", managed: true });
//index portfolios by a stocks
portfolioSchema.index({ "assets.symbol": 1 });

//Portfolio Methods
portfolioSchema.statics.priceAbove = function (value) {
  return this.find({ totalAssetValue: { $gt: value } });
};
portfolioSchema.statics.priceBelow = function (value) {
  return this.find({ totalAssetValue: { $lt: value } });
};

portfolioSchema.statics.findStock = function (symbol) {
  return this.find({ "assets.symbol": symbol });
};

export default mongoose.model("Portfolio", portfolioSchema);
