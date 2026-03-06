import mongoose from "mongoose";

const WatchListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  stocks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Asset"
    },
  ],
});

export default mongoose.model("WatchList", WatchListSchema)