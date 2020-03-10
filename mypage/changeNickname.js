import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Image, StyleSheet, ToastAndroid, Alert} from 'react-native';
import axios from "axios";
import PlainListItem from "../Component/PlainListItem";
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";

export default class changeNickname extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                pageTitle: "닉네임 변경",
                userEmail: props.navigation.getParam('userEmail'),
                nicknameFilled: false,
            }
    }

    //이거 닉네임에 맞게 고쳐써보자
    regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    isNicknameFine = newUserNickname => {
        if (newUserNickname.length < 2 || newUserNickname.length > 10) {
            this.setState({newUserNickname: newUserNickname, nicknameFilled: false});
        }

        //여기에 다른 조건들을 추가하자, 형식에 맞지 않는다든지, 비속어가 들어가있다든지, 뭐 그런거.

        else {
            this.setState({newUserNickname: newUserNickname, nicknameFilled: true});
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#6e6e6e', marginTop: 32}}>새 닉네임 입력</Text>

                    <TextInput  style={{width: '100%', aspectRatio: 328 / 32, backgroundColor: '#f0f0f0', paddingHorizontal: 16, paddingVertical: 0, marginTop: 12,
                                        fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: -0.75, color: '#000000'}}
                                placeholder={'2~10자 영어 또는 한글로 적어주세요.'}
                                placeholderTextColor={'#999999'}
                                onChangeText={newUserNickname => {
                                    this.isNicknameFine(newUserNickname);
                                }}
                                maxLength={10}
                                />

                    <Text   style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 13, letterSpacing: -0.31, color: '#000000', marginTop: 32}}>닉네임은 리뷰 작성할 때 사용자를 나타내는 또 다른 이름입니다.</Text>

                    {/* <Text>{JSON.stringify(this.state)}</Text> */}

                    {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                    <View   style={{flex: 1}}></View>

                    <TouchableOpacity   style={{width: '100%', aspectRatio: 328 / 48, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.nicknameFilled ? '#ed6578' : '#dddddd', marginVertical: 32}}
                                        disabled={!this.state.nicknameFilled}
                                        onPress={() => {
                                            Alert.alert('닉네임을 변경하려 합니다.', '정말로 변경하시겠습니까?', [
                                                {
                                                    text: '변경',
                                                    onPress : () => {
                                                        axios.post('http://13.124.193.165:3000/users/changeUserNickname', {
                                                            params: {
                                                                userEmail: this.state.userEmail,
                                                                newUserNickname: this.state.newUserNickname,
                                                            }
                                                        }).then(response => {
                                                            if(response.data === -1) {
                                                                ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                                                            }

                                                            else if(response.data === 1) {
                                                                ToastAndroid.show('닉네임이 성공적으로 변경되었습니다.', ToastAndroid.LONG);
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
                        <Text   style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#ffffff'}}>닉네임 변경하기</Text>
                    </TouchableOpacity>
                </View>


                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
        );
    }
}