const mongoose = require('mongoose');

// Define allowed statuses as an enum
const orderSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ['Received', 'Picked', 'Prepared'], // Predefined statuses
    default: 'Received', // Default status when an order is created
  },
});

module.exports = mongoose.model('Order', orderSchema);