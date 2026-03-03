import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['STOCK','ETF','CRYPTO']
    },
    exchange: {
        type: String,
        required: true,
    },
    currentPrice: Number,
    marketCap: Number,
    sector: {
        type: String,
        default: 'Unknown'
    },
})

export default mongoose.model('Asset',assetSchema)