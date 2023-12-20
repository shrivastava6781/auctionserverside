const mongoose = require('mongoose');

const auctionItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingPrice: Number,
  currentBid: Number,
  auctionEndDate: Date,
  bidHistory: [{ bidder: String, amount: Number, timestamp: Date }],
});

const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

module.exports = AuctionItem;
