import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const ForgottenPasswordButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    justifyContent: "center",
    opacity: 0.5
  }
});

export default ForgottenPasswordButton;
