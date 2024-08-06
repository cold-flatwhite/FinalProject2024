import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { database, auth } from "../firebase/firebaseSetups";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const collectionName = "orders";
  const currentUserID = auth.currentUser.uid;

  useEffect(() => {
    const fetchUserData = async (order) => {
      try {
        let providerData = null;
        let userData = null;
        let orderType = "";

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

    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      async (querySnapshot) => {
        setLoading(true);
        const ordersArray = [];
        for (const docSnapshot of querySnapshot.docs) {
          const orderData = docSnapshot.data();
          const orderWithUserData = await fetchUserData(orderData);
          if (orderWithUserData) {
            ordersArray.push({ ...orderWithUserData, id: docSnapshot.id });
          }
        }
        setOrders(ordersArray);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item: order }) => (
    <TouchableOpacity
      key={order.id}
      style={[
        styles.orderContainer,
        order.orderType === "post"
          ? styles.postOrderContainer
          : styles.receivedOrderContainer,
      ]}
      onPress={() => navigation.navigate("Order Information", { order })}
    >
      <Image source={{ uri: order.image }} style={styles.image} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderType}>
          {order.orderType === "post" ? "Placed Orders" : "Received Orders"}
        </Text>
        <Text style={styles.service}>{order.request}</Text>
        <Text style={styles.date}>
          {new Date(order.date).toLocaleDateString()}
        </Text>
        <Text
          style={
            order.status === "ongoing"
              ? styles.ongoing
              : order.status === "Complete"
              ? styles.complete
              : order.status === "Rejected"
              ? styles.rejected
              : styles.defaultStatus
          }
        >
          {order.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  orderContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  postOrderContainer: {
    backgroundColor: "#FFF3E0",
  },
  receivedOrderContainer: {
    backgroundColor: "#E8F5E9",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  service: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  ongoing: {
    fontSize: 14,
    color: "orange", // Orange for ongoing
  },
  complete: {
    fontSize: 14,
    color: "green", // Green for complete
  },
  rejected: {
    fontSize: 14,
    color: "red", // Red for rejected
  },
});
