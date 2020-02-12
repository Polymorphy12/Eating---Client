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

    render() {
        return (
            <View
                style= {{
                    flex: 1,
                }}>
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
                        <TouchableOpacity style={{width: '46%', height: '100%', backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#ffffff'}}>이메일 발송</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '46%', height: '100%', backgroundColor: '#ffffff', borderRadius: 100, borderWidth:1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#000000'}}>이메일 재발송</Text>
                        </TouchableOpacity>
                    </View>


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
