import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Modal, Alert } from 'react-native';
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';

export default function AdminScreen() {
  const { orders, fetchOrders, updateOrderStatus } = useContext(OrderContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const statusOptions = ['Received', 'Picked', 'Prepared'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus); // Update status in the backend
    setSelectedOrder(null); // Reset the selected order
    setModalVisible(false); // Close the modal
  };

  const handleClearOrders = async () => {
    Alert.alert(
      "Confirm Clear All Orders",
      "Are you sure you want to clear all orders? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await axios.delete('http://192.168.0.102:5000/api/orders');
              Alert.alert("Success", response.data.message);
              fetchOrders(); // Refresh the order list after clearing
            } catch (error) {
              console.error('Error clearing orders:', error);
              Alert.alert("Error", "Failed to clear orders.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ paddingLeft: 20 }}>
      
      <Button title="Clear All Orders" onPress={handleClearOrders} color="red" />
      <Text style={{ fontWeight: 'bold', padding: 10 }}>All Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={(order) => order._id}
        renderItem={({ item }) => (
          <View style={{ paddingLeft: 20, marginBottom: 10 }}>
            <Text>{item.studentName} ordered {item.quantity} {item.item}</Text>
            
            {/* Dropdown for Order Status */}
            <TouchableOpacity onPress={() => {
              setSelectedOrder(item);
              setModalVisible(true);
            }}>
              <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 10, marginEnd: 10 }}>
                Status: {item.status}
              </Text>
            </TouchableOpacity>

            {/* Modal for Status Options */}
            {selectedOrder && selectedOrder._id === item._id && (
              <Modal visible={modalVisible} transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    {statusOptions.map((status) => (
                      <TouchableOpacity
                        key={status}
                        onPress={() => handleStatusChange(item._id, status)}
                      >
                        <Text style={{ padding: 10, paddingBottom: 10 }}>{status}</Text>
                      </TouchableOpacity>
                    ))}
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                  </View>
                </View>
              </Modal>
            )}
          </View>
        )}
      />
    </View>
  );
}
