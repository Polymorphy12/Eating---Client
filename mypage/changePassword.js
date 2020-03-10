import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import axios from 'axios';

export default class changePassword extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                pageTitle: "비밀번호 변경",
                userEmail: props.navigation.getParam('userEmail'),
            }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.38, color: '#6e6e6e', marginTop: 32}}>현재 비밀번호 입력</Text>

                    <TextInput  style={{width: '100%', aspectRatio: 328 / 32, backgroundColor: '#f0f0f0', marginTop: 12, paddingHorizontal: 8, paddingVertical: 0,
                                        fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.29, color: '#000000'}}
                                placeholder={'**********'}
                                placeholderTextColor={'#d8d8d8'}
                                secureTextEntry={true}
                                onChangeText={currentPassword => this.setState({currentPassword})}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.newPasswordInput.focus()}
                                blurOnSubmit={false}/>

                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.38, color: '#6e6e6e', marginTop: 32}}>새 비밀번호 입력</Text>

                    <TextInput  style={{width: '100%', aspectRatio: 328 / 32, fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.29, color: '#000000', backgroundColor: '#f0f0f0', marginTop: 12, paddingHorizontal: 8, paddingVertical: 0}}
                                placeholder={'********'}
                                placeholderTextColor={'#d8d8d8'}
                                secureTextEntry={true}
                                onChangeText={newPassword => this.setState({newPassword})}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.reNewPasswordInput.focus()}
                                blurOnSubmit={false}
                                ref={(input) => { this.newPasswordInput = input; }}/>

                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.38, color: '#6e6e6e', marginTop: 32}}>새 비밀번호 확인</Text>

                    <TextInput  style={{width: '100%', aspectRatio: 328 / 32, fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.29, color: '#000000', backgroundColor: '#f0f0f0', marginTop: 12, paddingHorizontal: 8, paddingVertical: 0}}
                                placeholder={'********'}
                                placeholderTextColor={'#d8d8d8'}
                                secureTextEntry={true}
                                onChangeText={reNewPassword => this.setState({reNewPassword})}
                                ref={(input) => { this.reNewPasswordInput = input; }}/>

                    {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                    <View   style={{flex: 1}}></View>

                    <TouchableOpacity   style={{width: '100%', aspectRatio: 328 / 48, borderRadius: 100, alignItems: 'center', justifyContent: 'center',
                                                backgroundColor: (!this.state.currentPassword || !this.state.newPassword || !this.state.reNewPassword) ? '#dddddd' : '#ed6578',
                                                marginVertical: 32}}
                                        disabled={(!this.state.currentPassword || !this.state.newPassword || !this.state.reNewPassword)}
                                        onPress={() => {
                                            if(!this.state.currentPassword) {
                                                ToastAndroid.show('현재 비밀번호를 입력해주세요.', ToastAndroid.SHORT);
                                                return;
                                            }

                                            if(!this.state.newPassword) {
                                                ToastAndroid.show('새 비밀번호를 입력해주세요.', ToastAndroid.SHORT);
                                                return;
                                            }

                                            if(!this.state.reNewPassword) {
                                                ToastAndroid.show('새 비밀번호를 확인해주세요.', ToastAndroid.SHORT);
                                                return;
                                            }

                                            Alert.alert('비밀번호를 변경하려 합니다.', '정말로 변경하시겠습니까?', [
                                                    {
                                                        text: '변경',
                                                        onPress : () => {
                                                            axios.post('http://13.124.193.165:3000/users/changePassword', {
                                                                params: {
                                                                    userEmail: this.state.userEmail,
                                                                    currentPassword: this.state.currentPassword,
                                                                    newPassword: this.state.newPassword,
                                                                    reNewPassword: this.state.reNewPassword
                                                                }
                                                            }).then(response => {
                                                                if(response.data === -1) {
                                                                    ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                                                                }

                                                                else if(response.data === -2) {
                                                                    ToastAndroid.show('새 비밀번호와 확인이 일치하지 않습니다.', ToastAndroid.LONG);
                                                                }

                                                                else if(response.data === -3) {
                                                                    ToastAndroid.show('현재 비밀번호가 일치하지 않습니다.', ToastAndroid.LONG);
                                                                }

                                                                else if(response.data === 1) {
                                                                    ToastAndroid.show('비밀번호가 성공적으로 변경되었습니다.', ToastAndroid.LONG);
                                                                    this.props.navigation.goBack();
                                                                }
                                                                
                                                            }).catch((err) => {
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
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#ffffff'}}>비밀번호 변경하기</Text>
                    </TouchableOpacity>
                </View>

                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
        );
    }
}