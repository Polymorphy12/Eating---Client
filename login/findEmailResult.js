import React, { Component } from "react";
import { TouchableOpacity, Text, View, Button, TextInput, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "native-base";
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import MyHeader from "../Component/MyHeader";

export default class FindEmailResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageTitle: '아이디 찾기',
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
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:20, letterSpacing: -1, color: '#030303', marginTop: 48}}>아이디 검색 결과</Text>

                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize:16, letterSpacing: -0.8, color: '#6e6e6e', marginTop: 32}}>
                        {`고객님의 아이디는\n${this.props.navigation.getParam('userEmail')} 입니다.`}
                    </Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 48}}>
                        <TouchableOpacity style={{width: '46%', aspectRatio: 152 / 48, backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
                                            onPress={() => this.props.navigation.navigate("LogIn")}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#ffffff'}}>로그인</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '46%', aspectRatio: 152 / 48, backgroundColor: '#ffffff', borderRadius: 100, borderWidth:1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}
                                            onPress={() => this.props.navigation.navigate('findPassword')}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#000000'}}>비밀번호 찾기</Text>
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
