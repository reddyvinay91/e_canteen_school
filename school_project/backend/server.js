const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecanteen', { useNewUrlParser: true, useUnifiedTopology: true });

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
