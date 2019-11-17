import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import LoginButton from "../components/login/LoginButton";
import ForgottenPasswordButton from "../components/login/ForgottenPasswordButton";
import CheckBox from "../components/general/CheckBox";
import CustomTextInput from "../components/login/CustomTextInput";
import IncorrectLogin from "../components/login/IncorrectLogin";
import { Images } from "../styles";
import { BACKGROUND, TERNARY } from "../styles/colors";

export default class LoginScreen extends Component {
  allowedUser = {
    login: "mlhcoc",
    password: "pk"
  };

  check(login, password) {
    return (
      login == this.allowedUser.login && password == this.allowedUser.password
    );
  }

  forgottenPassword() {}

  printUserData() {
    console.log("Login:", this.loginInput.state.value);
    console.log("Password:", this.passwordInput.state.value);
    console.log("Remember me status:", this.remember.state.set);
  }

  handleWrong() {
    this.loginInput.handleWrong();
    this.passwordInput.handleWrong();
    this.incorrectMessage.show();
  }

  login() {
    console.log(this.loginInput);
    if (
      this.check(this.loginInput.state.value, this.passwordInput.state.value)
    ) {
      console.log("Log in request approved from a user with data:");
      this.printUserData();
      this.props.navigation.navigate("app");
    } else {
      console.log("Log in request failed from a user with data:");
      this.printUserData();
      this.handleWrong();
    }
  }

  setToNormal(toBlur) {
    return () => {
      this[toBlur].handleBlur();
      this.incorrectMessage.hide();
    };
  }

  render() {
    if(this.remember.state.set){
      this.props.navigation.navigate("app");
    }
    //console.log("login screen props", this.props);
    return (
      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <Image
          source={Images.logoStandard}
          style={styles.logo}
        />
        <View>
          <CustomTextInput
            ref={component => (this.loginInput = component)}
            placeholder="Login"
            onFocusInput={this.setToNormal("passwordInput").bind(this)}
          />
          <CustomTextInput
            ref={component => (this.passwordInput = component)}
            placeholder="Password"
            onFocusInput={this.setToNormal("loginInput").bind(this)}
          />
        </View>

        <View>
          <IncorrectLogin
            ref={component => (this.incorrectMessage = component)}
            label="Incorrect login or password"
          />
          <View style={styles.controlBar}>
            <View style={styles.checkBoxView}>
              <CheckBox ref={component => (this.remember = component)} />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <ForgottenPasswordButton
              label="Forgotten your password?"
              onPress={this.forgottenPassword.bind(this)}
            />
          </View>
          <LoginButton label="Log In" onPress={this.login.bind(this)} />
          <View style={{height: 20}}></View>
          <TouchableOpacity
            style={styles.button} >
           <Text style={styles.label}>Register</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 100,
    width: 260,
    marginBottom: 40
  },
  scroll: {
    paddingHorizontal: 30,
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: BACKGROUND,
    paddingVertical: 100
  },
  forgetButton: {
    justifyContent: "center",
    alignSelf: "flex-end"
  },
  controlBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  checkBoxView: {
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  rememberText: {
    marginLeft: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: TERNARY,
    borderRadius: 5,
},
label:{
    fontSize: 20,
    color: BACKGROUND
}
});
