import React, { Component } from "react";
import { TouchableOpacity, Text, View, Button, TextInput, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "native-base";
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import MyHeader from "../Component/MyHeader";

export default class FindPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            pageTitle: '비밀번호 찾기',
        }
    }

    regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    render() {
        return (
            <View style= {{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{flex: 1, marginHorizontal: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:20, letterSpacing: -1, color: '#030303', marginTop: 48}}>가입하신 이메일 주소를 입력하세요.</Text>

                    <TextInput
                        style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize:16, letterSpacing: -0.8, color: '#030303', borderWidth: 1, borderColor: '#6e6e6e', marginTop: 24, paddingHorizontal: 16}}
                        placeholder={"welcome@eating.com"}
                        placeholderTextColor={"#b9c2ce"}
                        keyboardType={'email-address'}
                        onChangeText={(userEmail) => this.setState({userEmail})}
                    />

                    <View style={{height: '7.5%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 36}}>
                        <TouchableOpacity style={{width: '46%', aspectRatio: 152 / 48, backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
                                            onPress={() => {
                                                if(!this.state.userEmail.match(this.regExp))
                                                {
                                                    ToastAndroid.show('잘못된 이메일 형식입니다.', ToastAndroid.SHORT);
                                                    return;
                                                }

                                                axios.post('http://13.124.193.165:3000/emailAuth/sendEmailWithTempPassword',{
                                                  params: {
                                                    userEmail : this.state.userEmail
                                                  }
                                                })
                                                .then(response => {
                                                  ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                                })
                                                .catch(function(error) {
                                                  console.log('There has been a problem with your fetch operation: ' + error.message);
                                                  // ADD THIS THROW error
                                                  throw error;
                                                });
                                            }}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#ffffff'}}>이메일 발송</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '46%', aspectRatio: 152 / 48, backgroundColor: '#ffffff', borderRadius: 100, borderWidth:1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#000000'}}>이메일 재발송</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text>{JSON.stringify(this.state.randomText)}</Text> */}
                </View>
                
                
            </View>
        );
    }
}