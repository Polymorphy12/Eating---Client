import React, { Component } from "react";
import { TouchableOpacity, Text, View, Button, TextInput, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "native-base";
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import MyHeader from "../Component/MyHeader";

export default class FindEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phoneNum : "",
            authNum : "",
            pageTitle: '아이디 찾기',
        } 
            
      }

    render() {
        const {navigation } = this.props;
        return (
            <View
                style= {{
                    flex: 1,
                }}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{flex: 1, marginHorizontal: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:20, letterSpacing: -1, color: '#030303', marginTop: 48}}>휴대폰 번호를 입력하세요.</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 24}}>
                        <TextInput
                            style={{width: '66.6%', aspectRatio: 208 / 32, fontFamily: 'S-CoreDream4-ExtraLight', fontSize:16, letterSpacing: -0.8, color: '#030303', borderWidth: 1, borderColor: '#6e6e6e', paddingHorizontal: 16, paddingVertical: 0}}
                            placeholder={"휴대전화 번호 ('-' 제외)"}
                            placeholderTextColor={"#b9c2ce"}
                            keyboardType={'number-pad'}
                            maxLength={11}
                            onChangeText={(phoneNum) => this.setState({phoneNum})}
                            returnKeyType={'next'}
                        />

                        <TouchableOpacity  style={{width: '27.8%', backgroundColor: '#ed6578', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, letterSpacing: -0.7, color: '#ffffff'}}>인증번호 받기</Text>
                        </TouchableOpacity>

                    </View>

                    <TextInput
                        style={{width: '100%', aspectRatio: 328 / 32 , fontFamily: 'S-CoreDream4-ExtraLight', fontSize:16, letterSpacing: -0.8, color: '#030303', borderWidth: 1, borderColor: '#6e6e6e', marginTop: 14, paddingHorizontal: 16, paddingVertical: 0}}
                        placeholder={"6자리 인증번호"}
                        placeholderTextColor={"#b9c2ce"}
                        keyboardType={'number-pad'}
                        maxLength={6}
                        onChangeText={(authNum) => this.setState({authNum})}
                    />

                    <TouchableOpacity style={{width: '100%', aspectRatio: 328 / 48, backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginTop: 36}}
                                        onPress={() => {

                                            if(this.state.phoneNum === "")
                                            {
                                                ToastAndroid.show("휴대전화 번호를 입력해 주세요.", ToastAndroid.SHORT);
                                                return;
                                            }
                                            else if(this.state.authNum === "")
                                            {
                                                ToastAndroid.show("인증번호를 입력해 주세요.", ToastAndroid.SHORT);
                                                return;
                                            }
                
                
                                            axios.post('http://13.124.193.165:3000/users/findEmail', {
                                                params: {
                                                    phoneNum : this.state.phoneNum,
                                                    authNum : this.state.authNum
                                                }
                                            })
                                                .then(response => {
                                                    //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                                    this.props.navigation.navigate('findEmailResult', {userEmail: response.data});
                                                })
                                                .catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    // ADD THIS THROW error
                                                    throw error;
                                                });
                                            //navigation.navigate("SelectRestaurant");
                                            
                                        }}
                                    >
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#ffffff'}}>아이디 찾기</Text>
                    </TouchableOpacity>

                </View>
                
                
            </View>
        );
    }
}

const email = {
    fontFamily: "S-CoreDream4-ExtraLight",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#202020",
    borderWidth: 1,
    borderColor: '#6e6e6e',
    marginTop: 48,
    paddingHorizontal: 16,
  };

  const password = {
    fontFamily: "S-CoreDream4-ExtraLight",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#202020",
    borderWidth: 1,
    borderColor: '#6e6e6e',
    marginTop: 12,
    paddingHorizontal: 16,
  };
