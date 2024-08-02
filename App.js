import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./screens/SearchScreen";
import OrderScreen from "./screens/OrderScreen";
import ProviderScreen from "./screens/ProviderScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Provider" component={ProviderScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
}
