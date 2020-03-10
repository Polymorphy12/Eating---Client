import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Image, StyleSheet, Alert, ToastAndroid} from 'react-native';
import axios from "axios";
import CheckBox from 'react-native-check-box';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";

export default class withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            pageTitle: '회원탈퇴',
            userEmail: props.navigation.getParam('userEmail'),
            graduationCheckBoxChecked: false,
            securityCheckBoxChecked: false,
            restaurantCheckBoxChecked: false,
            serviceCheckBoxChecked: false,
            somethingElseCheckBoxChecked: false,
            otherReasonText: '',
            lastWordText: '',
        }
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

                <View style={{paddingHorizontal: 30, marginTop: 16}}>
                    <Text style={{fontFamily: "S-CoreDream-4Regular", fontSize: 13, fontWeight: "200", 
                                fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{`그동안 잇힝을 이용해 주셔서 감사합니다!\n회원님께서 잇힝을 탈퇴하시는 이유를 알려주시면 보다 좋은 서비스 제공을 위해 노력하겠습니다.`}</Text>
                    <View>
                        <View style={checkBoxElementViewStyle}>
                            <CheckBox
                                    isChecked={this.state.graduationCheckBoxChecked}
                                    onClick={() => {this.setState({graduationCheckBoxChecked: !this.state.graduationCheckBoxChecked})}}
                                    ></CheckBox>
                            <Text style={checkBoxTextStyle}>졸업</Text>
                        </View>

                        <View style={checkBoxElementViewStyle}>
                            <CheckBox
                                    isChecked={this.state.securityCheckBoxChecked}
                                    onClick={() => {this.setState({securityCheckBoxChecked: !this.state.securityCheckBoxChecked})}}
                                    ></CheckBox>
                            <Text style={checkBoxTextStyle}>개인정보 및 보안 우려</Text>
                        </View>

                        <View style={checkBoxElementViewStyle}>
                            <CheckBox
                                    isChecked={this.state.restaurantCheckBoxChecked}
                                    onClick={() => {this.setState({restaurantCheckBoxChecked: !this.state.restaurantCheckBoxChecked})}}
                                    ></CheckBox>
                            <Text style={checkBoxTextStyle}>서비스 업체 불만족</Text>
                        </View>

                        <View style={checkBoxElementViewStyle}>
                            <CheckBox
                                    isChecked={this.state.serviceCheckBoxChecked}
                                    onClick={() => {this.setState({serviceCheckBoxChecked: !this.state.serviceCheckBoxChecked})}}
                                    ></CheckBox>
                            <Text style={checkBoxTextStyle}>서비스 기능 불편</Text>
                        </View>

                        <View style={checkBoxElementViewStyle}>
                            <CheckBox
                                    isChecked={this.state.somethingElseCheckBoxChecked}
                                    onClick={() => {this.setState({somethingElseCheckBoxChecked: !this.state.somethingElseCheckBoxChecked})}}
                                    ></CheckBox>
                            <Text style={checkBoxTextStyle}>기타</Text>
                        </View>

                        <TextInput style={TextInputStyle}
                                    editable={this.state.somethingElseCheckBoxChecked}
                                    multiline={true}
                                    onChangeText={(otherReasonText) => {
                                        this.setState({otherReasonText});
                                    }}></TextInput>

                        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 13, letterSpacing: -0.31, color: '#000000', marginTop: 27}}>마지막으로 해 주실 한 마디가 있나요?</Text>

                        <TextInput style={TextInputStyle}
                                    multiline={true}
                                    onChangeText={(lastWordText) => {
                                        this.setState({lastWordText});
                                    }}></TextInput>

                        <View style={{alignItems: 'center', marginTop: 27.5}}>
                            <TouchableOpacity style={{width: 65, height: 26, borderRadius: 4, backgroundColor: '#666666', alignItems: 'center', justifyContent: 'center'}}
                                            disabled={!(this.state.graduationCheckBoxChecked || this.state.securityCheckBoxChecked || this.state.restaurantCheckBoxChecked || this.state.serviceCheckBoxChecked || this.state.somethingElseCheckBoxChecked)}
                                            onPress = {() => {
                                                if (this.state.somethingElseCheckBoxChecked && !this.state.otherReasonText) {
                                                    ToastAndroid.show('탈퇴하시는 기타 사유를 입력해주세요.', ToastAndroid.SHORT);
                                                    return;
                                                }

                                                Alert.alert('회원탈퇴를 진행합니다.', '정말로 탈퇴하시겠습니까?', [
                                                        {
                                                            text: '탈퇴',
                                                            onPress : () => {
                                                                axios.post('http://13.124.193.165:3000/users/deleteAccount', {
                                                                    params: {
                                                                        userEmail: this.state.userEmail,
                                                                        graduation: this.state.graduationCheckBoxChecked,
                                                                        security: this.state.securityCheckBoxChecked,
                                                                        restaurantDissatisfaction: this.state.restaurantCheckBoxChecked,
                                                                        serviceDissatisfaction: this.state.serviceCheckBoxChecked,
                                                                        somthingElse: this.state.somethingElseCheckBoxChecked,
                                                                        otherReasonText: this.state.otherReasonText,
                                                                        lastWordText: this.state.lastWordText,
                                                                    }
                                                                }).then(response => {
                                                                    ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                                                    this.props.navigation.navigate('Home');
                                                                }).catch((error) => {
                                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                                    // ADD THIS THROW error
                                                                    throw error;
                                                                });
                                                            }
                                                        },
                                                        {text: '취소', onPress : () => ToastAndroid.show('취소되었습니다.', ToastAndroid.SHORT)}
                                                    ],
                                                    {cancelable: false}
                                                );
                                            }}>
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, letterSpacing: -0.36, color: '#ffffff'}}>탈퇴</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                <View   style={{flex: 1}}></View>

                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>

            </View>
        );
    }
}

const checkBoxElementViewStyle = {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
}

const checkBoxTextStyle = {
    fontFamily: 'S-CoreDream-5Medium',
    fontSize: 13,
    letterSpacing: -0.31,
    color: '#000000',
    marginLeft: 13,
}

const TextInputStyle = {
    width: '100%',
    aspectRatio: 5,
    fontSize: 11,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#707070',
}