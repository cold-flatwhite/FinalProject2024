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
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#4169E1" },
        headerTintColor: "white",
        headerRight: () => (
          <FontAwesome5
            name="user-circle"
            size={24}
            color="white"
            onPress={() => navigation.navigate("Profile")}
            style={{ marginRight: 10 }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Search") {
            iconName = "search1";
            return (
              <AntDesign name={iconName} size={size} color={focused ? "#4169E1" : "gray"} />
            );
          } else if (route.name === "Provider") {
            iconName = "application";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={focused ? "#4169E1" : "gray"}
              />
            );
          } else if (route.name === "My Orders") {
            iconName = "history";
            return (
              <FontAwesome
                name={iconName}
                size={size}
                color={focused ? "#4169E1" : "gray"}
              />
            );
          }
        },
        tabBarActiveTintColor: "#4169E1", // Optional, for text color of the active tab
        tabBarInactiveTintColor: "gray",  // Optional, for text color of the inactive tabs
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Provider" component={ProviderScreen} options={{ title: "Provider Signup" }} />
      <Tab.Screen name="My Orders" component={OrderScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
