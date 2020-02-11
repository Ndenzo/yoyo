import React, { Component } from "react";
import {
     Dimensions,
     ActivityIndicator,
     Image,
     Keyboard,
     KeyboardAvoidingView,
     StyleSheet,
     View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
const { width, height } = Dimensions.get("window");


import { theme, config } from "../constants";

export default class Notification extends Component {

     state = {
          title : "",
          icon : "",
          bgcolor : theme.colors.danger,
     };

     render() {
          const { navigation } = this.props;
          let { title, icon, bgcolor } = this.state;

          switch (config.notification.type) {
               case 'success':
               title = "Well done !";
               icon = require("../assets/icons/checked.png");
               bgcolor = theme.colors.lighten_success ;
               break;
               case 'warning':
               title = "Error !";
               icon = require("../assets/icons/alert.png");
               bgcolor = theme.colors.lighten_warning ;
               break;
               default:
               title = "Big Bug !";
               icon = require("../assets/icons/cancel.png");
               bgcolor = theme.colors.lighten_danger ;
               break;
          }
          // this.setState({ title: title });
          // this.setState({ bgcolor: bgcolor });


          return (
               <KeyboardAvoidingView style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bgcolor,
               }} behavior="padding">
               <Block padding={[0, theme.sizes.base * 2]}>
               <Text h1 bold style = {theme.screen.header} >
               {title}
               </Text>
               <Block style={styles.form}>

               <Image
               source={icon}
               resizeMode="contain"
               style={{ width, height: 150, overflow: "visible",}}
               />

               <Text h3 bold style = {styles.message} >
               {config.notification.message}
               </Text>

               <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
               <Button gradient onPress={() => navigation.navigate(config.notification.callback)}>
               <Text center semibold white>
               Return
               </Text>
               </Button>
               </Block>

               </Block>
               </Block>
               </KeyboardAvoidingView>
          );
     }
}

const styles = StyleSheet.create({
     form:{
          marginTop: 50,
     },
     login: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     message: {
          margin: 50,
          textAlign: 'center',
     },
});
