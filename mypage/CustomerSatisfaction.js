import React, { Component } from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, Linking} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";
import MyPageListItem from "../Component/MyPageListItem";

export default class CustomerSatisfaction extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pageTitle: "고객만족센터"
        };
    };

    render(){
        return(
            <View style= {{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

                <ScrollView>
                    <TouchableOpacity style = {itemContainer}
                                        onPress={() => Linking.canOpenURL("fb://page/1007718226284774/").then(supported => {
                                            if (supported) {
                                                Linking.openURL("fb://page/1007718226284774/");
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {itemImage}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_페이스북.png')}
                                resizeMode={"contain"}></Image>
                        <Text style = {itemText}>{`잇힝 페이스북`}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {itemContainer}
                                        onPress={() => Linking.canOpenURL(`https://www.instagram.com/eating_teamds/?igshid=1h23t2v6kh7i2`).then(supported => {
                                            if (supported) {
                                                Linking.openURL(`https://www.instagram.com/eating_teamds/?igshid=1h23t2v6kh7i2`);
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {itemImage}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_인스타그램.png')}
                                resizeMode={"contain"}></Image>
                        <Text style = {itemText}>{`잇힝 인스타그램`}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {itemContainer}
                                        onPress={() => Linking.canOpenURL("https://pf.kakao.com/_xdEwNj").then(supported => {
                                            if (supported) {
                                                Linking.openURL("https://pf.kakao.com/_xdEwNj");
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {itemImage}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_카카오톡.png')}
                                resizeMode={"contain"}></Image>
                        <Text style = {itemText}>{`잇힝 카카오톡 플친`}</Text>
                    </TouchableOpacity>
                </ScrollView>

                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
        );
    }
}

const itemContainer = {flexDirection: 'row', width: '100%', aspectRatio: 360 / 60, alignItems: 'center', borderBottomWidth : 1, borderColor : "#f0f0f0"};
const itemImage = {marginLeft : "6.7%", width: 32, height : 32};
const itemText = {fontFamily: "S-CoreDream-4Regular", fontSize: 15, letterSpacing: -0.36, color: "#000000", marginLeft : "2.8%"};