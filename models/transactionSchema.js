import mongoose from "mongoose";

const transSchema = new mongoose.Schema({
  portfID: {
    type: mongoose.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
  assetID: {
    type: mongoose.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  action: {
    type: String,
    enum: {
      values: ["BUY", "SELL"],
      message: "{VALUE} can be BUY or SELL only",
    },
    required: true,
  },
  shares: {
    type: Number,
    required: true,
    min: 0,
  },
  avgSharePrice: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transSchema)