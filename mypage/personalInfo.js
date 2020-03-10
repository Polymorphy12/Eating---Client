import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Image, StyleSheet, ToastAndroid, Alert} from 'react-native';
import axios from "axios";
import PlainListItem from "../Component/PlainListItem";
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";

export default class personalInfo extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                pageTitle: "개인정보 수정",
                userEmail: props.navigation.getParam('userEmail'),
                userName: props.navigation.getParam('userName'),
                newUserName: '',
                newPassword: '',
                data: {},
            }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                
                <View style={{width: '100%', aspectRatio: 360 / 92, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', justifyContent: 'center', paddingHorizontal:16}}>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.38, color: '#6e6e6e'}}>이메일 아이디</Text>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 14, letterSpacing: -0.34, color: '#000000', marginHorizontal: 4}}>{this.state.userEmail}</Text>
                </View>

                <PlainListItem itemTitle='닉네임 변경'              onPress={() => this.props.navigation.navigate('changeNickname', {userEmail: this.state.userEmail})}></PlainListItem>
                <PlainListItem itemTitle='비밀번호 변경'            onPress={() => this.props.navigation.navigate('changePassword', {userEmail: this.state.userEmail})}></PlainListItem>
                <PlainListItem itemTitle='인증 휴대폰 번호 변경'    onPress={() => this.props.navigation.navigate('changePhoneNum', {userEmail: this.state.userEmail})}></PlainListItem>
                {/* <PlainListItem itemTitle='회원 탈퇴'                onPress={() => this.props.navigation.navigate('withdrawal', {userEmail: this.state.userEmail})}></PlainListItem> */}
                
                {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                <View style={{flex: 1}}></View>

                <View style={{alignItems: 'flex-end', marginBottom: 80, paddingHorizontal: 20}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('withdrawal', {userEmail: this.state.userEmail})}>
                        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 10, letterSpacing: -0.24, color: '#9f9f9f'}}>회원탈퇴</Text>
                    </TouchableOpacity>
                </View>

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
};

const background = {
    height: 160,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderStyle: "solid",
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth : 1,
    borderTopColor: "#f0f0f0",
};