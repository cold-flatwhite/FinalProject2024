import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { database, auth } from "../firebase/firebaseSetups";
import OrderItem from "../components/OrderItem";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const collectionName = "orders";
  const currentUserID = auth.currentUser.uid;

  useEffect(() => {
    // Function to fetch user or provider data based on order details
    const fetchUserData = async (order) => {
      try {
        let providerData = null;
        let userData = null;
        let orderType = "";

        // Check if the order belongs to the current user
        if (order.provider_id === currentUserID) {
          userData = (
            await getDoc(doc(database, "users", order.user_id))
          ).data();
          orderType = "received";
        } else if (order.user_id === currentUserID) {
          providerData = (
            await getDoc(doc(database, "users", order.provider_id))
          ).data();
          orderType = "post";
        } else {
          return null;
        }

        // Return the order with additional user or provider data
        return {
          ...order,
          providerData,
          userData,
          orderType,
        };
      } catch (err) {
        console.error("Error fetching user data: ", err);
        return { ...order, providerData: null, userData: null, orderType: "" };
      }
    };

    // Subscribe to Firestore collection and fetch orders data
    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      async (querySnapshot) => {
        setLoading(true); // Set loading to true while fetching data
        const ordersArray = [];
        for (const docSnapshot of querySnapshot.docs) {
          const orderData = docSnapshot.data();
          const orderWithUserData = await fetchUserData(orderData);
          if (orderWithUserData) {
            ordersArray.push({ ...orderWithUserData, id: docSnapshot.id });
          }
        }
        setOrders(ordersArray); // Set the fetched orders to state
        setLoading(false); // Set loading to false once data is fetched
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Render each order item using the OrderItem component
  const renderItem = ({ item: order }) => (
    <OrderItem
      order={order}
      onPress={() => navigation.navigate("Order Information", { order })}
    />
  );

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render the list of orders
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FA",
    padding: 10,
  },
});
