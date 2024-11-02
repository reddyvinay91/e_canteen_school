import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderProvider } from './context/OrderContext';
import StudentScreen from './screens/StudentScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Toggle between Student and Admin screens
  const toggleScreen = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <OrderProvider>
      <NavigationContainer>
        <View style={{ padding: 10, paddingTop: 100 }}>
          {/* Toggle Button */}
          <Button
            title={isAdmin ? "Order Food" : "Check Orders Status"}
            onPress={toggleScreen}
          />
        </View>
        
        <Stack.Navigator initialRouteName="Student">
          {/* Conditionally render based on isAdmin state */}
          {isAdmin ? (
            <Stack.Screen name="Admin" component={AdminScreen} />
          ) : (
            <Stack.Screen name="Student" component={StudentScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </OrderProvider>
  );
}