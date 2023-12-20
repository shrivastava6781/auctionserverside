const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const auctionRoutes = require('./routes/auctionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.DATABASE;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;

// Routes
app.use('/api/auction', auctionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
