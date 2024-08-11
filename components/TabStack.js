// TabStack.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import OrderScreen from "../screens/OrderScreen";
import ProviderScreen from "../screens/ProviderScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const TabStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <FontAwesome5
            name="user-circle"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Profile")}
            style={{ marginRight: 10 }}
          />
        ),
      }}
    >
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
        name="Provider"
        component={ProviderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="application"
              size={24}
              color="black"
            />
          ),
          title: "Sign Up as a Petcare Provider",
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
