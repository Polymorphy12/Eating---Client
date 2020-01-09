import React, { Component } from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";
import MyPageListItem from "../Component/MyPageListItem";

export default class Announcement extends Component {

    constructor(props) {
        super(props);
        this.state = { buttonColor: "#fadee2", pageTitle: "고객만족센터" , isVisible: false};
    };

    render(){
        return(
            <View style= {{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <ScrollView>
                    <MyPageListItem itemTitle = "Eating! 페이스북" contact = "facebook" 
                    navigation = {this.props.navigation} 
                    onPress = {() => {

                    }}></MyPageListItem>
                    <MyPageListItem itemTitle = "Eating! 인스타그램" contact = "instagram"></MyPageListItem>
                    <MyPageListItem itemTitle = "Eating! 카카오톡 플친" contact = "kakao"></MyPageListItem>
                </ScrollView>
                <MyFooter navigation={this.props.navigation}></MyFooter>
            </View>
        );
    }
}

const totalContainer = {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    //justifyContent: "center",
    zIndex: -1
  }