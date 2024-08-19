import React from "react";
import { Pressable, View, Text } from "react-native";
import styles from "../styles";

// A customizable pressable button component
const PressableButton = ({ children, pressedFunction, componentStyle }) => {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => [
        styles.defaultStyle,
        componentStyle,
        pressed && styles.pressableStyle,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;
