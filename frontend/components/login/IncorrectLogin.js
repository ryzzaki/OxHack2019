import React, { Component } from "react";

import { StyleSheet, Text } from "react-native";

export default class IncorrectLogin extends Component {

  show(){
     this.setState({visible: true});
  }

  hide(){
    this.setState({visible: false});
  }

  state = {
      visible: false
  }
  render() {
    return (<Text style={{...styles.info, opacity: ~~this.state.visible}}>{this.props.label}</Text>);
  }
}

const styles = StyleSheet.create({
   info: {
        color: 'red',
        marginBottom: 20,
        alignSelf: 'center',
   }
});
