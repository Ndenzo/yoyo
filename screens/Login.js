import React, { Component } from "react";
import {
     ActivityIndicator,
     Keyboard,
     KeyboardAvoidingView,
     StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import axios from "axios";
import { theme, config } from "../constants";

export default class Login extends Component {
     state = {
          email: "",
          password: "",
          errors: [],
          loading: false
     };

     handleLogin() {
          const { navigation } = this.props;
          const { email, password } = this.state;
          const errors = [];

          Keyboard.dismiss();
          this.setState({ loading: true });

          const instance = axios.create({
               baseURL: config.api.url,
               timeout: 1000,
               headers: {'api_key': config.api.api_key}
          });

          const data = new FormData();
          data.append('username', this.state.email);
          data.append('password', this.state.password);

          instance.post("/auth/token", data).then(function (response) {
               config.api.token = response.data.token;
               navigation.navigate("Browse");
          }).catch(function (error) {
               errors.push("email");
               errors.push("password");
               console.log(errors);
          });

          this.setState({ errors, loading: false });

          //if (!errors.length) {
          //navigation.navigate("Browse");
          //}
     }

     render() {
          const { navigation } = this.props;
          const { loading, errors } = this.state;
          const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

          return (
               <KeyboardAvoidingView style={styles.login} behavior="padding">
               <Block padding={[0, theme.sizes.base * 2]}>
               <Text h1 bold style = {theme.screen.header} >
               AUTHENTICATION
               </Text>
               <Block middle>
               <Input
               label="Email"
               error={hasErrors("email")}
               style={[styles.input, hasErrors("email")]}
               onChangeText={text => this.setState({ email: text })}
               />
               <Input
               secure
               label="Password"
               error={hasErrors("password")}
               style={[styles.input, hasErrors("password")]}
               onChangeText={text => this.setState({ password: text })}
               />
               <Button gradient onPress={() => this.handleLogin()}>
               {loading ? (
                    <ActivityIndicator size="small" color="white" />
               ) : (
                    <Text bold white center>
                    Login
                    </Text>
               )}
               </Button>

               <Button onPress={() => navigation.navigate("Forgot")}>
               <Text
               gray
               caption
               center
               style={{ textDecorationLine: "underline" }}
               >
               Forgot your password?
               </Text>
               </Button>
               </Block>
               </Block>
               </KeyboardAvoidingView>
          );
     }
}

const styles = StyleSheet.create({
     login: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
     },
     input: {
          borderRadius: 0,
          borderWidth: 0,
          borderBottomColor: theme.colors.gray2,
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: 300,
     },
     hasErrors: {
          borderBottomColor: theme.colors.accent
     }
});
