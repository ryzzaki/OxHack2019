import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { PRIMARY, BACKGROUND } from "../../styles/colors";

import { StyleSheet} from "react-native";

export default class FontAwesomeRegular extends Component {
  render() {
    return (
      <FontAwesomeIcon
        icon={this.props.icon}
        style={{...styles.iconStyle, borderColor: this.props.color || PRIMARY}}
        color={
          this.props.isIconBackground
            ? this.props.backgroundColor || BACKGROUND
            : this.props.color || PRIMARY
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    borderWidth: 2,
    borderRadius: 2.3
  }
});
