const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Error fetching orders.' });
  }
});

router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: 'Error fetching order.' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: 'Failed to create order.' });
  }
});

// Update an existing order status
router.put('/:id', async (req, res) => {
  const orderId = req.params.id;
  console.log("checking order ID:", orderId);
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: 'Failed to update order status.' });
  }
});

// Clear all orders
router.delete('/', async (req, res) => {
  try {
    await Order.deleteMany(); // This will remove all orders from the database
    res.status(200).json({ message: 'All orders cleared successfully.' });
  } catch (error) {
    console.error("Error clearing orders:", error);
    res.status(500).json({ message: 'Failed to clear orders.' });
  }
});

module.exports = router;
