import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Browse from "../screens/Browse";
import Charge from "../screens/Charge";
import None from "../screens/None";

import { theme } from "../constants";

const screens = createStackNavigator(
     {
          Welcome,
          Login,
          Browse,
          Charge,
          None,
     },
     {
           defaultNavigationOptions: {
                headerTitleStyle: {
                    color: "#FFFFFF",
                    fontWeight: "bold",
                },
                headerStyle: {
                     height: theme.sizes.base * 4,
                     backgroundColor: theme.colors.primary, // or 'white
                     borderBottomColor: "transparent",
                     elevation: 0 // for android
                },
                headerBackImage: () => <Image source={require("../assets/icons/real_back.png")} style={{width: theme.sizes.sm, height: theme.sizes.sm,}} />,
                headerLeftContainerStyle: {
                     alignItems: "center",
                     //marginLeft: theme.sizes.base * 2,
                     paddingRight: theme.sizes.base,
                },
                headerRightContainerStyle: {
                     alignItems: "center",
                     paddingRight: theme.sizes.base,
                }
           }
     }
);

export default createAppContainer(screens);
