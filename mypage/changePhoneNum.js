import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import axios from 'axios';

export default class changePhoneNum extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                pageTitle: "인증 휴대폰 번호 변경",
                userEmail: props.navigation.getParam('userEmail'),
                isPasswordCorrect: false,
                alreadySent: false,
            }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#6e6e6e', marginTop: 32}}>비밀번호 확인</Text>

                    <TextInput  style={{width: '100%', aspectRatio: 328 / 32, fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#000000', backgroundColor: '#f0f0f0', marginTop: 12, paddingHorizontal: 16, paddingVertical: 0}}
                                placeholder={'***********'}
                                placeholderTextColor={'#d8d8d8'}
                                secureTextEntry={true}
                                onChangeText={currentPassword => this.setState({currentPassword})}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.newPhoneNumInput.focus()}
                                blurOnSubmit={false}/>

                    <View   style={{alignItems: 'flex-end', marginTop: 24}}>
                        <TouchableOpacity   style={{borderRadius: 5, backgroundColor: '#ed6578'}}
                                            onPress={() => {
                                                if(!this.state.currentPassword) {
                                                    ToastAndroid.show('현재 비밀번호를 입력해주세요.', ToastAndroid.SHORT);
                                                    return;
                                                }

                                                axios.post('http://13.124.193.165:3000/users/changePhoneNumAuth',{
                                                    params: {
                                                        userEmail : this.state.userEmail,
                                                        currentPassword: this.state.currentPassword,
                                                    }
                                                }).then(response => {
                                                    if (response.data === -1)       ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                                                    else if (response.data === -2)  ToastAndroid.show('잘못된 비밀번호입니다.', ToastAndroid.LONG);
                                                    else if (response.data === 1)   this.setState({isPasswordCorrect: true});
                                                }).catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    // ADD THIS THROW error
                                                    throw error;
                                                });
                                            }}>
                            <Text   style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 15, letterSpacing: -0.75, color: '#ffffff', paddingHorizontal: 17, paddingVertical: 5}}>비밀번호 확인</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: this.state.isPasswordCorrect ? '#6e6e6e' : '#d2d2d2', marginTop: 32}}>새 휴대폰 번호</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12}}>
                        <TextInput  style={{width: '100%', aspectRatio: 328 / 32, fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#000000', backgroundColor: this.state.isPasswordCorrect ? '#f0f0f0' : '#fafafa', paddingHorizontal: 16, paddingVertical: 0}}
                                    placeholder={'휴대폰 번호 입력'}
                                    placeholderTextColor={this.state.isPasswordCorrect ? '#d8d8d8' : '#dfdfdf'}
                                    editable={this.state.isPasswordCorrect}
                                    maxLength={11}
                                    onChangeText={newPhoneNum => this.setState({newPhoneNum})}
                                    keyboardType={'number-pad'}
                                    onSubmitEditing={() => this.authNumInput.focus()}
                                    blurOnSubmit={false}
                                    ref={(input) => { this.newPhoneNumInput = input; }}/>
                    </View>

                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: this.state.isPasswordCorrect ? '#6e6e6e' : '#d2d2d2', marginTop: 32}}>인증번호 확인</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12}}>
                        <TextInput  style={{width: '54.9%', aspectRatio: 180 / 32, fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#000000', backgroundColor: this.state.isPasswordCorrect ? '#f0f0f0' : '#fafafa', paddingHorizontal: 16, paddingVertical: 0}}
                                    placeholder={'인증번호 입력'}
                                    placeholderTextColor={'#d8d8d8'}
                                    editable={this.state.isPasswordCorrect}
                                    secureTextEntry={true}
                                    onChangeText={authNum => this.setState({authNum})}
                                    maxLength={6}
                                    keyboardType={'number-pad'}
                                    ref={(input) => { this.authNumInput = input; }}/>

                        <View style={{width: '38.41%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={{width: '52.38%', aspectRatio: 66 / 32, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: this.state.isPasswordCorrect ? '#ed6578' : '#f9d0d5'}}
                                                disabled={!this.state.isPasswordCorrect}
                                                onPress={() => {
                                                    
                                                }}>
                                {/* 한 번 발송이 됐다면 재발송으로 바뀌도록 만들자 */}
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, letterSpacing: -0.75, color: '#ffffff'}}>{this.state.alreadySent ? '재발송' : '발송'}</Text>
                            </TouchableOpacity>

                            <View style={{width: '31.75%', alignItems: 'center', justifyContent: 'center'}}>
                                {/* moment.js로 타이머를 돌리자 */}
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, letterSpacing: -0.36, color: this.state.isPasswordCorrect ? '#666666' : '#d0d0d0', marginRight: 4}}>3:00</Text>
                            </View>
                        </View>
                    </View>

                    {/* <Text>{JSON.stringify(this.state)}</Text> */}

                    {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                    <View   style={{flex: 1}}></View>

                    <TouchableOpacity   style={{width: '100%', aspectRatio: 328 / 48, alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: '#ed6578', marginVertical: 32}}>
                        <Text   style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#ffffff'}}>휴대폰 번호 변경하기</Text>
                    </TouchableOpacity>
                </View>


                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
        );
    }
}