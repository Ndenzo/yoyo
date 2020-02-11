import React, { Component } from "react";
import {
     Dimensions,
     ActivityIndicator,
     ScrollView,
     SafeAreaView,
     StyleSheet,
     View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { RadioButton } from 'react-native-paper';
import { ListItem } from 'react-native-elements'


import axios from "axios";
import { theme, config, notification } from "../constants";

const { width } = Dimensions.get("window");

export default class Charge extends Component {
     state = {
          instance : axios.create({
               baseURL: config.api.url,
               timeout: 1000,
               headers: {
                    'api-key': config.api.api_key,
                    'Authorization-Token': config.api.token,
               }
          }),
     };

     info = instance => {

     }

     render() {
          const { navigation } = this.props;
          let { instance } = this.state;

          instance.get("/profile/get_history").then(function (response) {
               config.api.history = response.data;
          }).catch(function (error) {
               config.notification.type = "warning";
               config.notification.message =  "Check your authentication informations !";
               config.notification.callback = "Browse";
               console.log(error);
               navigation.navigate("Notification");
          });

          return (
               <Block padding={[0, theme.sizes.base * 2]}>
               <Text h1 bold style = {theme.screen.header} >
               HISTORY
               </Text>
               <SafeAreaView style={styles.form}>
               <ScrollView style={styles.scrollView}>
               {
                    config.api.history.map((l, i) => (
                         <ListItem
                         containerStyle = {styles.item, {backgroundColor: l.style }}
                         subtitleStyle = {styles.item_style}
                         key={i}
                         title={l.transaction_name}
                         subtitle={l.date}
                         rightTitle={l.transaction_value}
                         bottomDivider
                         />
                    ))
               }
               </ScrollView>
               </SafeAreaView>
               </Block>
          );
     }
}

const styles = StyleSheet.create({
     form:{
          alignContent: 'flex-start',
          marginTop: 30,
          marginBottom: 110
     },
     login: {
          flex: 1,
          marginLeft: 0,
          width,
     },
     input: {
          borderRadius: 0,
          borderWidth: 0,
          borderBottomColor: theme.colors.gray2,
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: 300,
     },
     item_style:{
          color:theme.colors.gray2,
     },
     item: {
          backgroundColor: theme.colors.lighten_success,
          width: width - 55,
          height: 70,
     },
     checkboxes: {
          marginTop: 20,
          marginBottom: 10
     },
     hasErrors: {
          borderBottomColor: theme.colors.accent
     }
});
