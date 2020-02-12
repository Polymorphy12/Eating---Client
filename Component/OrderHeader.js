import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Header, Title, Left, Right } from 'native-base';

export default class OrderHeader extends React.Component {
    render() {
        return(
            <Header style={navBar}>
              <Left style = {{flex:1}}>
                <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}><Image
                style={{width:23, height:23}}
                source={require('../assets/images/drawable-xxhdpi/아이콘_뒤로가기.png')}
                >
                </Image></TouchableOpacity>
              </Left>
              <Title style={titleText}>{this.props.pageTitle}</Title>
              <Right style = {{flex:1}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("shoppingCart", {is_get : true, userEmail : this.props.username});
                }}><Image
                  style={{width:27, height:23, marginRight: 10}}
                  source={require('../assets/images/drawable-xxhdpi/아이콘_장바구니.png')}>
                </Image></TouchableOpacity>
              </Right>
            </Header>
        );
    }
}


const navBar = {
    height: 70,
    //opacity: 0.51,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    //shadowOffset: {height: 0, width: 0}, 
    //shadowOpacity: 0, 
    elevation: 0,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
  };

  const titleText = {
    // width: 225.6,
    // height: 25,
    flex:1,
    fontFamily: "S-CoreDream-5Medium",
    fontSize: 20,
    fontWeight: "800",
    fontStyle: "normal",
    // lineHeight: 25,
    letterSpacing: -0.1,
    textAlign: "center",
    color: "#000000"
  };