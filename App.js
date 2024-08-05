import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import OrderScreen from './screens/OrderScreen';
import ProviderScreen from './screens/ProviderScreen';
import OrderInfoScreen from './screens/OrderInfoScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PostOrderScreen from './screens/PostOrderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserIcon = ({ navigation }) => (
  <FontAwesome5
    name="user-circle"
    size={24}
    color="black"
    onPress={() => navigation.navigate('Profile')}
    style={{ marginRight: 10 }}
  />
);

const TabStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <UserIcon navigation={navigation} />
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
          title: 'Sign Up as a Petcare Provider'
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => <UserIcon navigation={navigation} />
        })}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Main"
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Order Information" component={OrderInfoScreen} />
        <Stack.Screen name="PostOrderScreen" component={PostOrderScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
