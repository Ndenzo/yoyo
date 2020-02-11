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
import { CheckBox } from 'react-native-elements';


import axios from "axios";
import { theme, config, notification } from "../constants";

export default class Send extends Component {
     state = {
          code: "",
          value: 0,
          checkboxes: [],
          checked : "",
          errors: [],
          loading: false
     };

     handleCharge() {
          const { navigation } = this.props;
          const { code, value, checked } = this.state;
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
          data.append('value', value);
          data.append('card', checked);

          instance.post("/transfer/make_transfer", data).then(function (response) {
               for (let card of config.api.profile.cards) {
                    if (card.card_id === checked) {
                         card.card_wallet = response.data.card_wallet;
                         config.notification.type = "success";
                         config.notification.message =  "Send this code to the customer : "+response.data.transfer_tmp_code;
                         config.notification.callback = "Transfer";
                         navigation.navigate("Notification");
                    }
               }
          }).catch(function (error) {
               config.notification.type = "warning";
               config.notification.message =  error.message;
               config.notification.callback = "Transfer";
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
               TRANSFER
               </Text>
               <Block style={styles.form}>

               <Input
               label="Insert the customer code !"
               error={hasErrors("code")}
               style={[styles.input, hasErrors("code")]}
               onChangeText={text => this.setState({ code: text })}
               />

               <Input
               number
               label="How much you wanna transfer ?"
               error={hasErrors("value")}
               style={[styles.input, hasErrors("value")]}
               onChangeText={text => this.setState({ value: text })}
               />

               <Text style={styles.checkboxes}>
               Select your card !
               </Text>
               {this.state.checkboxes.map((card, i)  =>
                    <CheckBox
                    containerStyle={{backgroundColor: theme.colors.default}}
                    key={`checker-${i}`}
                    left
                    title= {card.card_number + " \n " + card.card_wallet+" GMD"}
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
                    Submit
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
