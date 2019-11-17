import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { PRIMARY, BACKGROUND } from '../../styles/colors';
 
const LoginButton = (props) => {
 
    return (
        <TouchableOpacity
            onPress={props.onPress} 
            style={styles.button}
        >
           <Text style={styles.label}>{props.label}</Text>
        </TouchableOpacity>
    );
}
 
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: PRIMARY,
        borderRadius: 5,
    },
    label:{
        fontSize: 20,
        color: BACKGROUND
    }
});
 
export default LoginButton;