import React, { Component } from "react";
import FontAwesomeRegular from "./FontAwesomeRegular";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { View, TouchableWithoutFeedback } from "react-native";

export default class CheckBox extends Component {
  toggleCheckBox() {
    this.setState({
      set: !this.state.set
    });
  }

  state = {
    set: false
  };
  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.toggleCheckBox.bind(this)}>
          <View>
            <FontAwesomeRegular
              icon={this.state.set ? faCheckSquare : faSquare}
              isIconBackground={!this.state.set}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
