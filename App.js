import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./screens/SearchScreen";
import OrderScreen from "./screens/OrderScreen";
import ProviderScreen from "./screens/ProviderScreen";
import OrderInfoScreen from "./screens/OrderInfoScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name=" Provider"
        component={ProviderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="application"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen name="My Orders" component={OrderScreen} 
      options={
        {
          tabBarIcon : ({color, size}) => (
            <FontAwesome name="history" size={24} color="black" />
          )
        }
      }/>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="My orders"
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Order Information" component={OrderInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
