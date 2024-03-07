import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Animated} from "react-native";

interface MessageProps {
  status: "success" | "error";
  text: string;
  speed?: number;
  customPosition?: [number, number];
}

const MessageToast = ({status, text, speed, customPosition}: MessageProps) => {
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    const moveMessage = () => {
      const entranceDuration = 500; // Duration for the message to come down fast
      const stillDuration = speed; // Duration for the message to stay still
      const exitDuration = 500; // Duration for the message to go up slowly

      Animated.sequence([
        Animated.timing(position, {
          toValue: 1,
          duration: entranceDuration,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 1,
          duration: stillDuration,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: exitDuration,
          useNativeDriver: true,
        }),
      ]).start();
    };

    moveMessage();

    return () => {
      position.setValue(0);
    };
  }, [speed, position]);

  const interpolateY = position.interpolate({
    inputRange: [0, 1],
    outputRange: customPosition ? customPosition : [-200, -80],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: interpolateY}]}]}
    >
      <Text
        style={[
          styles.text,
          status === "success" ? styles.success : styles.error,
        ]}
      >
        {text}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    zIndex: 99,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 20,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
  },
  success: {
    backgroundColor: "green",
    color: "white",
  },
  error: {
    backgroundColor: "red",
    color: "white",
  },
});

export default MessageToast;
