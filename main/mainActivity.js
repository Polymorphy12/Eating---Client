import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class MainActivity extends Component {
    
    setItem = async(key, value) => {
        try{
            await AsyncStorage.setItem(key, value);
        } catch(e){

        }
    };

    getItem = async (key) => {
        try{
            const value = await AsyncStorage.getItem(key);
            if(value !== null){
                return value
            }
        } catch(e){

        }
    };

    removeItem = async (key) =>{
        try{
            await AsyncStorage.removeItem(key);
        } catch(e){

        }
    };
    
    render() {
        const { navigation } = this.props;
        return (

            <ImageBackground style={{flex: 1, backgroundColor: "grey", alignItems: 'center', paddingHorizontal: 16}}
                                source={require('../assets/images/drawable-hdpi/intro1.png')}>

                {/* 제목 */}
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 32, letterSpacing: -1.07, color: '#ffffff', marginTop: 48}}>잇힝! (Eating!)</Text>

                {/* 
                    제목 밑에 공간 있어요 
                    여기다가 캐러셀 넣어줘야 함
                */}
                <View style={{flex: 1}}></View>

                {/*  */}
                <TouchableOpacity style={{width: '100%', aspectRatio: 328 / 58, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed6578'}}
                                    title="first"
                                    onPress={() => {
                                        
                                        this.getItem("tkn").then((value)=>{
                                            console.log(value);
                                            //ToastAndroid.show(value, ToastAndroid.SHORT);
                
                                            if(value !==undefined){
                                                
                                                axios.get('http://13.124.193.165:3000/auth/auto_login', {
                                                    params: {
                                                        token : value
                                                    }
                                                })
                                                .then(response =>{
                                                    console.log(response.data);
                                                    ToastAndroid.show(response.data.e_mail, ToastAndroid.SHORT);
                                                    navigation.navigate("SelectRestaurant", {userEmail : response.data.e_mail});
                                                })
                                                .catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    // ADD THIS THROW error
                                                    throw error;
                                                });
                                                
                                                // ToastAndroid.show(value, ToastAndroid.SHORT);  
                                                // console.log(value);
                                            }
                                            else {
                                                navigation.navigate("LogIn");
                                            }
                                            
                                        }).catch((e) => {
                                            console.log(e);
                                        });
                                        
                                        //navigation.navigate("LogIn");
                                    }}>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, letterSpacing: -0.9, color: '#ffffff'}}>이미 회원이세요? 로그인 하기!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 22, marginBottom: 28}}
                                    onPress= {() => {
                                        navigation.navigate("signUp1");
                                    }}>
                    <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 14, letterSpacing: -0.7, color: '#ffffff'}}>새로 오셨어요? </Text>
                    <Text style={{fontFamily: 'S-CoreDream-7ExtraBold', fontSize: 14, letterSpacing: -0.7, color: '#ffffff'}}>회원가입 하기!</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const mainTitle = {
    fontSize: 40,
    fontFamily: "SCDream5",
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -1.07,
    textAlign: "center",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: {
        width: 0,
        height: 2
    },
    textShadowRadius: 4,
    marginTop: 48
};

const letsGetStarted = {
    fontFamily: "SCDream6",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
};

const signIn = {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: "center"
}

const signIn2 = {
    fontFamily: "SCDream4",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
};

const signIn3 = {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
};

const hitArea = {
    width: 336,
    height: 400,
    backgroundColor: "rgba(216, 216, 216, 0)"
};

const noMoreGimcheon = {
    width: 218,
    height: 31,
    fontFamily: "Avenir",
    fontSize: 23,
    fontWeight: "900",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
};