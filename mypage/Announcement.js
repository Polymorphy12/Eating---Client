import React, { Component } from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, Linking} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";
import MyPageListItem from "../Component/MyPageListItem";

export default class Announcement extends Component {

    constructor(props) {
        super(props);
        this.state = { buttonColor: "#fadee2", pageTitle: "잇힝 안내" , isVisible: false};
    };

    render(){
        return(
            <View style= {{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <ScrollView>
                    {/* <MyPageListItem itemTitle = "Eating! 페이스북" contact = "facebook" 
                    navigation = {this.props.navigation} 
                    onPress = {() => {

                    }}></MyPageListItem>
                    <MyPageListItem itemTitle = "Eating! 인스타그램" contact = "instagram"></MyPageListItem>
                    <MyPageListItem itemTitle = "Eating! 카카오톡 플친" contact = "kakao"></MyPageListItem>
                    <TouchableOpacity onPress={() => Linking.canOpenURL("fb://page/1007718226284774/").then(supported => {
                                                        if (supported) {
                                                            Linking.openURL("fb://page/1007718226284774/");
                                                        } else {
                                                            alert('sorry invalid url')
                                                        }
                                                    })}>
                        <Text>빠빠빠빠</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}
                                        onPress={() => Linking.canOpenURL("fb://page/1007718226284774/").then(supported => {
                                            if (supported) {
                                                Linking.openURL("fb://page/1007718226284774/");
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {{marginLeft : "4.4%", width: 32, height : 32}}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_페이스북.png')}
                                resizeMode={"contain"}></Image>
                        <View style = {{marginLeft : "4.4%", height: 32, justifyContent: 'center'}}>
                            <Text style = {{fontFamily: "S-CoreDream4", fontSize: 15, fontWeight: "200", fontStyle: "normal", letterSpacing: -0.41, color: "#000000"}}>{`Eating! 페이스북`}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}
                                        onPress={() => Linking.canOpenURL(`https://www.instagram.com/eating_teamds/?igshid=1h23t2v6kh7i2`).then(supported => {
                                            if (supported) {
                                                Linking.openURL(`https://www.instagram.com/eating_teamds/?igshid=1h23t2v6kh7i2`);
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {{marginLeft : "4.4%", width: 32, height : 32}}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_인스타그램.png')}
                                resizeMode={"contain"}></Image>
                        <View style = {{marginLeft : "4.4%", height: 32, justifyContent: 'center'}}>
                            <Text style = {{fontFamily: "S-CoreDream4", fontSize: 15, fontWeight: "200", fontStyle: "normal", letterSpacing: -0.41, color: "#000000"}}>{`Eating! 인스타그램`}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}
                                        onPress={() => Linking.canOpenURL("https://pf.kakao.com/_xdEwNj").then(supported => {
                                            if (supported) {
                                                Linking.openURL("https://pf.kakao.com/_xdEwNj");
                                            } else {
                                                alert('sorry invalid url')
                                            }
                                        })}>
                        <Image style = {{marginLeft : "4.4%", width: 32, height : 32}}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_카카오톡.png')}
                                resizeMode={"contain"}></Image>
                        <View style = {{marginLeft : "4.4%", height: 32, justifyContent: 'center'}}>
                            <Text style = {{fontFamily: "S-CoreDream4", fontSize: 15, fontWeight: "200", fontStyle: "normal", letterSpacing: -0.41, color: "#000000"}}>{`Eating! 카카오톡 플친`}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
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