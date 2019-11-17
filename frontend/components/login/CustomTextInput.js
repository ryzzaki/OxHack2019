import {PRIMARY, SECONDARY, TERNARY, BACKGROUND} from "../../styles/colors";
import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
export default class CustomTextInput extends Component {
    getDynamicStyle(){
        return{
            borderBottomColor: this.state.borderColor,
            backgroundColor: this.state.backgroundColor
        }
    }

    handleFocus(){
        this.props.onFocusInput();
        this.setState({
            borderColor: PRIMARY,
            backgroundColor: BACKGROUND
        })
    }
    handleBlur(){
        this.setState({
            borderColor: TERNARY,
            backgroundColor: BACKGROUND
        })
    }
    handleWrong(){
        this.setState({
            borderColor: 'red',
            backgroundColor: 'rgba(256, 0, 0, 0.05)'
        })
    }
  state={
      borderColor: TERNARY,
      value: ''
  }
  render() {
    return(<TextInput
      placeholder={this.props.placeholder}
      autoCapitalize={'none'}
      selectionColor={TERNARY}
      style={{...styles.textInput, ...this.getDynamicStyle()}}
      onFocus = {this.handleFocus.bind(this)}
      onBlur = {this.handleBlur.bind(this)}
      secureTextEntry = {this.props.placeholder=="Password"}
      onChangeText = {text => this.setState({value: text})}
    />);
  }
  
}
const styles = StyleSheet.create({
    textInput:{
        fontSize: 20,
        borderBottomWidth: 1,
        marginBottom: 60,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    }
  });
  
