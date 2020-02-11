import React, { Component } from "react";
import {
     Dimensions,
     ActivityIndicator,
     Keyboard,
     KeyboardAvoidingView,
     StyleSheet,
     View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';


import axios from "axios";
import { theme, config, notification } from "../constants";

const { width } = Dimensions.get("window");

export default class Receive extends Component {
     state = {
          code: "",
          checkboxes: [],
          checked: "",
          isVisible: true,
          errors: [],
          loading: false
     };

     handleCharge() {
          const { navigation } = this.props;
          const { code, checked, isVisible } = this.state;
          const errors = [];

          Keyboard.dismiss();
          this.setState({ loading: true });

          const instance = axios.create({
               baseURL: config.api.url,
               timeout: 2000,
               headers: {
                    'api-key': config.api.api_key,
                    'Authorization-Token': config.api.token,
               }
          });

          const data = new FormData();
          data.append('code', code);
          data.append('card', checked);

          instance.post("/transfer/save_transfer", data).then(function (response) {
               for (let card of config.api.profile.cards) {
                    if (card.card_id === checked) {
                         config.notification.type = "success";
                         config.notification.message = response.data.message;
                         config.notification.callback = "Browse";
                         navigation.navigate("Notification");
                    }
               }
          }).catch(function (error) {
               config.notification.type = "warning";
               config.notification.message = "Something went wrong. Check your code !";
               config.notification.callback = "Browse";
               navigation.navigate("Notification");
               console.log(error);
          });

          this.setState({ errors, loading: false });
     }

     toggleCheckbox(id) {
          let checkboxes = [];
          for (let card of this.state.checkboxes) {
               if (card.card_id === id) {
                    card.checked = true;
                    this.setState({ checked : card.card_id });
               }else{
                    card.checked = false;
               }
               checkboxes.push(card);
          }
          checkboxes => this.setState({ checkboxes });
     }

     render() {
          const { navigation } = this.props;
          const { loading, errors, checked } = this.state;
          const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

          if(this.state.checkboxes && !this.state.checkboxes.length){
               for(let card of config.api.profile.cards) {
                    card.checked = false;
                    this.state.checkboxes.push(card);
               }
          }

          return (
               <KeyboardAvoidingView style={styles.login} behavior="padding">
               <Block padding={[0, theme.sizes.base * 2]}>
               <Text h1 bold style = {theme.screen.header} >
               RECEIVE
               </Text>
               <Block style={styles.form}>
               <Input
               label="Insert the transfer code !"
               error={hasErrors("code")}
               style={[styles.input, hasErrors("code")]}
               onChangeText={text => this.setState({ code: text })}
               />

               <Text style={styles.checkboxes}>
               Select your card !
               </Text>
               {this.state.checkboxes.map((card, i)  =>
                    <CheckBox
                    containerStyle={{backgroundColor: theme.colors.default}}
                    key={`checker-${i}`}
                    left
                    title= {card.card_number}
                    iconLeft
                    iconType='material'
                    checkedIcon='check'
                    uncheckedIcon='add'
                    checkedColor={theme.colors.success}
                    checked={this.state.checkboxes[i].checked}
                    onPress={() => this.toggleCheckbox(card.card_id)}
                    />
               )}

               <Button gradient onPress={() => this.handleCharge()}>
               {loading ? (
                    <ActivityIndicator size="small" color="white" />
               ) : (
                    <Text bold white center>
                    Check
                    </Text>
               )}
               </Button>

               </Block>
               </Block>
               </KeyboardAvoidingView>
          );
     }
}

const styles = StyleSheet.create({
     form:{
          marginTop: 30,
     },
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

     checkboxes: {
          marginTop: 20,
          marginBottom: 10
     },
     hasErrors: {
          borderBottomColor: theme.colors.accent
     }
});
