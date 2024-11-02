import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { OrderContext } from '../context/OrderContext';

export default function StudentScreen() {
  const { addOrder } = useContext(OrderContext);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Predefined list of items
  const itemsList = ['Idli','Dosa','poori','upma','Pizza', 'Burger', 'Pasta', 'Salad', 'Sandwich'];

  const handleOrder = () => {
    addOrder({ studentName: name, item, quantity: Number(quantity), status: 'Received' });
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>Order Details:</Text>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} />

      {/* Simple Dropdown */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', color: item ? 'black' : 'gray' }}>
          {item || 'Select an item'}
        </Text>
      </TouchableOpacity>

      {/* Modal to show dropdown options */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            {itemsList.map((foodItem) => (
              <TouchableOpacity key={foodItem} onPress={() => {
                setItem(foodItem);
                setModalVisible(false);
              }}>
                <Text>{foodItem}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Place Order" onPress={handleOrder} />
    </View>
  );
}