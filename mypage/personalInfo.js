import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";
import { ScrollView } from "react-native-gesture-handler";

export default class personalInfo extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                pageTitle: "개인정보 수정",
                name: '나이름',
            }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <ScrollView contentContainerStyle = {totalContainer}>
                    <View style = {background}>
                        <TouchableOpacity 
                            style={{width: 60, height : 60, marginRight : "7.8%", marginLeft: "4.4%"}}
                            onPress = {() => {this.setState({isVisible: true})}}>
                            <Image
                                style = {{width: 60, height : 60, marginRight : "7.8%", marginLeft: "4.4%"}}
                                source={require('../assets/images/drawable-xxxhdpi/고객등급_브론즈.png')}></Image>
                        </TouchableOpacity>
                        
                        <View style = {{flexDirection: 'column' }}>
                            <Text
                                style = {{width: 76, height: 20, fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                                fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#6e6e6e"}}
                            >브론즈</Text>

                            <TextInput
                                style={{width: 76, height: 25, fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#000000",
                                    margin: 0, padding: 0, borderBottomWidth: 1}}
                                maxLength={12}
                                defaultValue={this.state.name}
                            />
                        </View>

                        <TouchableOpacity style={{width: 30, height : 30, marginLeft: 'auto', marginRight: '10%'}}
                            onPress={() => this.props.navigation.navigate('personalInfo')}>
                            <Image 
                                style = {{width: 30, height : 30, marginLeft: 'auto', marginRight: '6.67%',}}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_체크.png')}></Image>
                        </TouchableOpacity>
                    </View>

                    {/* 이메일 아이디 수정 */}
                    <View style={{height: 90, borderTopWidth: 1, borderTopColor: '#d8d8d8'}}>
                        <Text style={{fontFamily: "S-CoreDream4", fontSize: 10, fontWeight: "200", 
                                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', marginTop: '4%', textAlign: "left", color: "#6e6e6e"}}>이메일 아이디</Text>

                        <TextInput style={{height: 35, fontFamily: "S-CoreDream4", fontSize: 12, fontWeight: "200", 
                                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '5.5%', padding: 0, textAlign: "left", color: "#000000",}}
                                    defaultValue={'malinmango77@unist.ac.kr'}></TextInput>
                    </View>
                    
                    {/* 비밀번호 수정 */}
                    <View style={{height: 90, borderTopWidth:1, borderTopColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',}}>
                        <Text style={{fontFamily: "S-CoreDream4", fontSize: 10, fontWeight: "200", 
                                        fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', marginTop: '4%', marginBottom: '1%', textAlign: "left", color: "#6e6e6e"}}>비밀번호</Text>
                        
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <TextInput style={{fontFamily: "S-CoreDream4", fontSize: 12, fontWeight: "200", flex: 0.6,
                                            fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', padding: 0, textAlign: "left", color: "#000000", backgroundColor: '#d8d8d8'}}
                                            placeholder={'4자 이상'}>

                            </TextInput>

                            <View style={{flex: 0.4, marginLeft: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{marginLeft: '7.5%'}}>
                                    <Text style={{fontFamily: "S-CoreDream6-Bold", fontSize: 15, lineHeight: 20, letterSpacing: -0.41, color: '#6e6e6e'}}>수정</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* 휴대폰 인증 */}
                    <View style={{height: 90, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'}}>
                        <View style={{flexDirection: 'row', marginBottom: '1%'}}>
                            <Text style={{fontFamily: "S-CoreDream4", fontSize: 10, fontWeight: "200", 
                                        fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', marginTop: '4%', textAlign: "left", color: "#6e6e6e"}}>휴대폰 인증</Text>
                            <Text style={{fontFamily: "S-CoreDream4", fontSize: 7, fontWeight: "200", 
                                        fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', marginTop: '4%', textAlign: "left", color: "#6e6e6e"}}>휴대폰 번호를 (-) 없이 입력해 주세요.</Text>
                        </View>
                        
                        <View style={{height: 25, flexDirection: 'row'}}>
                            <TextInput style={{fontFamily: "S-CoreDream4", fontSize: 12, fontWeight: "200", flex: 0.6,
                                            fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, marginLeft: '4.4%', padding: 0, textAlign: "left", color: "#000000", backgroundColor: '#d8d8d8'}}
                                            placeholder={'01012345678'}>

                            </TextInput>

                            <View style={{flex: 0.4, marginLeft: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{marginLeft: '7.5%'}}>
                                    <Text style={{fontFamily: "S-CoreDream6-Bold", fontSize: 15, lineHeight: 20, letterSpacing: -0.41, color: '#6e6e6e'}}>재인증</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{marginRight: '11%', marginTop: '2.5%',}}
                                        onPress={() => this.props.navigation.navigate('withdrawal')}>
                            <Text style={{fontFamily: "S-CoreDream6-Bold", fontSize: 10, lineHeight: 20, letterSpacing: -0.41, color: '#9f9f9f'}}>회원탈퇴</Text>
                        </TouchableOpacity>
                        
                    </View>

                </ScrollView>
                <MyFooter navigation={this.props.navigation} mypageBoolean={true}></MyFooter>

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