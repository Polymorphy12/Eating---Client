import React, { Component } from "react";
import { TouchableOpacity, Text, View, Button, TextInput, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "native-base";
import axios from 'axios';
import CheckBox from 'react-native-check-box';
import MyHeader from "../Component/MyHeader";

export default class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            e_mail : "",
            pass_word : "",
            pageTitle: '로그인',
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
                    <TextInput
                        style={email}
                        placeholder= "이메일 주소 입력"
                        placeholderTextColor={"#b9c2ce"}
                        onChangeText={(e_mail) => this.setState({e_mail})}
                        returnKeyType={'next'}
                    />

                    <TextInput
                        style={password}
                        secureTextEntry = {true}
                        placeholder= "비밀번호 입력"
                        placeholderTextColor={"#b9c2ce"}
                        onChangeText={(pass_word) => this.setState({pass_word})}
                    />

                    <View style={{ height: 24, marginTop: 26, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CheckBox
                                uncheckedCheckBoxColor={'#888888'}
                                checkedCheckBoxColor={'#ed6578'}
                                isChecked={this.state.serviceCheckBoxChecked}
                                onClick={() => {this.setState({serviceCheckBoxChecked: !this.state.serviceCheckBoxChecked})}}
                            ></CheckBox>

                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:12, letterSpacing: -0.6, color: '#000000', marginLeft: 16}}>자동 로그인 하기</Text>

                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('findEmail')}>
                                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize:12, letterSpacing: -0.6, color: '#000000', marginRight: 12}}>아이디 찾기</Text>
                            </TouchableOpacity>

                            <View style={{width: 1, height: 12, backgroundColor: '#707070'}}></View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('findPassword')}>
                                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize:12, letterSpacing: -0.6, color: '#000000', marginLeft: 12}}>비밀번호 찾기</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                    <TouchableOpacity style={{height: '7.5%', backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginTop: 35}}
                                        onPress={() => {

                                            if(this.state.e_mail == "" || this.state.pass_word == "")
                                            {
                                                ToastAndroid.show("이메일과 비밀번호를 입력해주세요.", ToastAndroid.SHORT);
                                                return;
                                            }
                
                
                                            axios.post('http://13.124.193.165:3000/auth/login', {
                                                params: {
                                                    userEmail : this.state.e_mail,
                                                    password : this.state.pass_word
                                                }
                                            })
                                                .then(response => {
                                                    //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                                    if(response.data === true) {
                                                        navigation.navigate("SelectRestaurant", {userEmail : this.state.e_mail});
                                                    }
                                                    else ToastAndroid.show('아이디 또는 비밀번호가 잘못되었습니다.', ToastAndroid.SHORT);
                                                })
                                                .catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    // ADD THIS THROW error
                                                    throw error;
                                                });
                                            //navigation.navigate("SelectRestaurant");
                                            
                                        }}
                                    >
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:20, letterSpacing: -1, color: '#ffffff'}}>로그인</Text>
                    </TouchableOpacity>

                    <View style={{marginTop: 24, alignItems: 'center'}}>
                        <TouchableOpacity style={{width: '60%', flexDirection: 'row', justifyContent: 'center'}}
                                            onPress= {() => {
                                                navigation.navigate("signUp1");
                                            }}>
                            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize:14, letterSpacing: -0.7, color: '#000000',}}>새로 오셨어요? </Text>
                            <Text style={{fontFamily: 'S-CoreDream-7ExtraBold', fontSize:14, letterSpacing: -0.7, color: '#000000',}}>회원가입 하기!</Text>
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
