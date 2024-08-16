import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderInfoScreen from "./screens/OrderInfoScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PostOrderScreen from "./screens/PostOrderScreen";
import Map from "./screens/Map";
import TabStack from "./components/TabStack";
import { auth } from "./firebase/firebaseSetups";
import { onAuthStateChanged } from "firebase/auth";
import PressableButton from "./components/PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();

const defaultSetting = ({ navigation }) => ({
  headerStyle: { backgroundColor: "#4169E1" },
  headerTintColor: "white",
});

// Authentication Stack
const AuthStack = (
  <>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </>
);

// App Stack
const AppStack = (
  <>
    <Stack.Screen
      name="Main"
      component={TabStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Order Information" component={OrderInfoScreen} />
    <Stack.Screen name="PostOrderScreen" component={PostOrderScreen} />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerRight: () => {
          return (
            <PressableButton
              pressedFunction={async () => {
                try {
                  await signOut(auth);
                } catch (err) {
                  console.error("Error signing out:", err);
                }
              }}
            >
              <AntDesign name="logout" size={24} color="black" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultSetting}>
        {isUserAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
