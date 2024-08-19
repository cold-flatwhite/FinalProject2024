import * as Notifications from "expo-notifications";

// Function to verify and request notification permissions
export const verifyPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === "granted") {
    return true;
  }
  const result = await Notifications.requestPermissionsAsync();
  return result.status === "granted";
};

// Function to schedule notifications
export const scheduleOrderNotifications = async (orderDate) => {
  const hasPermission = await verifyPermission();
  if (!hasPermission) {
    alert("Notification permissions are required to set reminders.");
    return;
  }

  try {
    // Schedule immediate notification (trigger in 1 second)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Reminder",
        body: `Order starts on ${orderDate.toLocaleDateString()}`,
      },
      trigger: { seconds: 1 }, // Trigger 1 second later
    });

    // Schedule notification for 8 AM on the service date
    const morningTrigger = new Date(orderDate);
    morningTrigger.setHours(8, 0, 0);
    const secondsUntilMorning = (morningTrigger.getTime() - Date.now()) / 1000;

    if (secondsUntilMorning > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Order Reminder",
          body: `Order starts on ${orderDate.toLocaleDateString()}`,
        },
        trigger: { seconds: secondsUntilMorning }, // Trigger at 8 AM on the service date
      });
    } else {
      alert("Expected Order Start time has passed.");
    }
  } catch (err) {
    console.error("Error scheduling notifications:", err);
  }
};

// Set notification handler for app-wide notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
