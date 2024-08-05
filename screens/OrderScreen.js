import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseSetup";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const collectionName = "orders";

  useEffect(() => {
    const fetchUserData = async (order) => {
      try {
        const currentUserID = auth.currentUser.uid;
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
          ordersArray.push({ ...orderWithUserData, id: docSnapshot.id });
        }
        setOrders(ordersArray);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderContainer}
          onPress={() => navigation.navigate("Order Information", { order })}
        >
          <Image source={{ uri: order.image }} style={styles.image} />

          <View>
            <Text style={styles.orderType}>
              {order.orderType === "post" ? "Placed orders" : "Received Orders"}
            </Text>
            {order.orderType === "post" && (
              <Text style={styles.provider}>
                {order.providerData
                  ? order.providerData.name
                  : "Unknown Provider"}{" "}
                <Text style={styles.providerTag}>Provider</Text>
              </Text>
            )}
            {order.orderType === "received" && (
              <Text style={styles.user}>
                {order.userData ? order.userData.name : "Unknown User"}{" "}
                <Text style={styles.userTag}>User</Text>
              </Text>
            )}
            <Text style={styles.service}>{order.request}</Text>
            <Text
              style={
                order.status === "Ongoing" ? styles.ongoing : styles.complete
              }
            >
              {order.status}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
