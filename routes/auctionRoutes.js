const express = require('express');
const router = express.Router();
const AuctionItem = require('../models/AuctionItem');

// Get all auction items
router.get('/items', async (req, res) => {
  try {
    const items = await AuctionItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new auction item
router.post('/items', async (req, res) => {
  const newItem = new AuctionItem({
    title: req.body.title,
    description: req.body.description,
    startingPrice: req.body.startingPrice,
    currentBid: req.body.startingPrice,
    auctionEndDate: req.body.auctionEndDate,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Place a bid on an auction item
router.post('/items/:id/bid', async (req, res) => {
  try {
    const item = await AuctionItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    if (req.body.amount <= item.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    item.currentBid = req.body.amount;
    item.bidHistory.push({ bidder: req.body.bidder, amount: req.body.amount, timestamp: new Date() });

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
