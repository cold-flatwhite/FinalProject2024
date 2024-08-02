import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import OrderScreen from './screens/OrderScreen';
import ProviderScreen from './screens/ProviderScreen';
import OrderInfoScreen from './screens/OrderInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Provider" component={ProviderScreen} />
      <Tab.Screen name="My Orders" component={OrderScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabStack} options={{ headerShown: false }} />
        <Stack.Screen name="OrderInfo" component={OrderInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
