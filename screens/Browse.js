import React, { Component } from "react";
import {
     Dimensions,
     Image,
     StyleSheet,
     ScrollView,
     TouchableOpacity
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks, config } from "../constants";
import axios from "axios";

const { width } = Dimensions.get("window");

class Browse extends Component {
     state = {
          active: "Products",
          categories: [],
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
          instance.get("/profile/get_profile").then(function (response) {
               config.api.profile = response.data.profile;
          }).catch(function (error) {
               config.notification.type = "warning";
               config.notification.message =  "Check your authentication informations !";
               config.notification.callback = "Browse";
               console.log(error);
               navigation.navigate("Notification");
          });
     }

     componentDidMount() {
          this.interval = setInterval(() => this.setState({ time: Date.now() }), 5000);
          this.setState({ categories: this.props.categories });
     }

     componentWillUnmount() {
          clearInterval(this.interval);
     }

     handleTab = tab => {
          const { categories } = this.props;
          const filtered = categories.filter(category =>
               category.tags.includes(tab.toLowerCase())
          );

          this.setState({ active: tab, categories: filtered });
     };

     renderTab(tab) {
          const { active } = this.state;
          const isActive = active === tab;

          return (
               <TouchableOpacity
               key={`tab-${tab}`}
               onPress={() => this.handleTab(tab)}
               style={[styles.tab, isActive ? styles.active : null]}
               >
               <Text size={16} medium gray={!isActive} secondary={isActive}>
               {tab}
               </Text>
               </TouchableOpacity>
          );
     }

     render() {

          const { profile, navigation } = this.props;
          const { categories, instance } = this.state;

          return (
               <Block style={{backgroundColor: theme.colors.primary, marginTop: 20,}}>
               <Block flex={false} row center space="between" style={styles.header}>
               <Text h4 style = {{marginLeft: 10, color: theme.colors.primary, fontWeight: "bold"}}>
               {this.info(instance)}
               {"\n"}{config.api.profile.user_nicename}
               {"\n"}Solde : {config.api.profile.solde}
               {"\n"}Cards : {config.api.profile.cards_num}{"\n"}
               </Text>
               <Image source={require('../assets/icon.png')} style={ styles.logo} />
               </Block>

               <ScrollView
               showsVerticalScrollIndicator={false}
               style={{ paddingVertical: theme.sizes.base * 2 }}
               >
               <Block flex={false} row space="between" style={styles.categories}>
               {categories.map(category => (
                    <TouchableOpacity
                    key={category.name}
                    onPress={() => navigation.navigate(category.screen)}
                    >
                    <Card center middle shadow style={styles.category}>
                    <Badge
                    margin={[0, 0, 15]}
                    size={80}
                    color="rgba(119,183,232,0.20)"
                    >
                    <Image source={category.image} style={{width: theme.sizes.md, height: theme.sizes.md,}}/>
                    </Badge>
                    <Text medium height={20}>
                    {category.name}
                    </Text>
                    <Text gray caption style={{textAlign: 'center', fontSize: 10,}}>
                    {category.desc}
                    </Text>
                    </Card>
                    </TouchableOpacity>
               ))}
               </Block>
               </ScrollView>
               <Block style={styles.bottom}>
               <Button white onPress={() => navigation.navigate("Welcome")} style={{width: 60, height: 60, borderRadius: 30, margin: 30, alignItems: "center", marginLeft: (width - 90)}}>
               <Image source={require("../assets/icons/logout.png")} style={{width: 30, height: 30}}/>
               </Button>
               </Block>
               </Block>


          );
     }
}

Browse.defaultProps = {
     profile: mocks.profile,
     categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
     header: {
          height: 120,
          backgroundColor: '#FFFFFF',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
     },
     logo: {
          alignContent:'center',
          flex: 2,
          width: 100,
          height: 100,
          resizeMode: 'contain',
     },
     avatar: {
          height: theme.sizes.base * 2.2,
          width: theme.sizes.base * 2.2
     },
     tabs: {
          borderBottomColor: theme.colors.gray2,
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: theme.sizes.base,
          marginHorizontal: theme.sizes.base * 2
     },
     tab: {
          marginRight: theme.sizes.base * 2,
          paddingBottom: theme.sizes.base
     },
     active: {
          borderBottomColor: theme.colors.secondary,
          borderBottomWidth: 3
     },
     categories: {
          flexWrap: "wrap",
          paddingHorizontal: theme.sizes.base * 2,
          marginBottom: theme.sizes.base * 3.5
     },
     category: {
          // this should be dynamic based on screen width
          minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
          maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
          maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
     },
     bottom: {
          flex: 4,
          justifyContent: 'flex-end',
          marginBottom: 36,
     }
});
