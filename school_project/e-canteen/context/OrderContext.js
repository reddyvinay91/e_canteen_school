import React, { createContext, useState } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  // Function to fetch all orders from the backend
  const fetchOrders = async () => {
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get('http://192.168.0.102:5000/api/orders');
      setOrders(response.data); // Set the fetched orders to state
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
      setError("Failed to load orders. Please try again."); // Set error message
    }
  };

  // Function to add a new order
  const addOrder = async (order) => {
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('http://192.168.0.102:5000/api/orders', order);
      setOrders([...orders, response.data]); // Update the state with the new order
    } catch (err) {
      console.error("Error adding order:", err);
      setError("Failed to add order. Please try again."); // Set error message
    }
  };

  // Function to update the status of an order
  const updateOrderStatus = async (orderId, newStatus) => {
    setError(null);
    console.log("Updating order with ID:", orderId); // Log the order ID being updated
    try {
        // Make sure the orderId matches the _id in the database
        const response = await axios.put(`http://192.168.0.102:5000/api/orders/${orderId}`, { status: newStatus });

        // Log the response from the server
        console.log("Update response:", response.data);

        // Update the order status in the local state
        setOrders(orders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
        ));
    } catch (err) {
        console.error("Error updating order status:", err);
        setError("Failed to update order status. Please try again.");
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, addOrder, updateOrderStatus, error }}>
      {children}
    </OrderContext.Provider>
  );
};
