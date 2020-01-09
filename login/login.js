import React, { Component } from "react";
import { TouchableOpacity, Text, View, Button, TextInput, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "native-base";
import axios from 'axios';

export default class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            e_mail : "",
            pass_word : ""
        } 
            
      }

    render() {
        const {navigation } = this.props;
        return (
            <View
                style= {{
                    flex: 1
                }}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: -1
                    }}
                >
                    <Text style={layer}> 학식탈출 </Text>
                    <Text style ={loginStyle}>로그인</Text>
                    <TextInput
                        style={email}
                        placeholder= "email"
                        onChangeText={(e_mail) => this.setState({e_mail})}
                    />

                    {/* 
                        Placeholder : TextInput의 힌트
                    */}
                    <TextInput
                        style={password}
                        secureTextEntry = {true}
                        placeholder= "password"
                        onChangeText={(pass_word) => this.setState({pass_word})}
                    />
                    {/* 
                        <Button
                        onPress={() => {
                            navigation.navigate("restaurantGrid");
                        }}
                        title="Press Me"
                        /> 
                    */}
                        
                </ScrollView>
                {/* <View> */}
                    <TouchableOpacity
                        style={orderButton}
                        onPress={() => {

                            if(this.state.e_mail == "" || this.state.pass_word == "")
                            {
                                ToastAndroid.show("이메일과 비밀번호를 입력해주세요.", ToastAndroid.SHORT);
                                return;
                            }


                            axios.post('http://13.124.193.165:3000/auth/login', {
                                params: {
                                    username : this.state.e_mail,
                                    password : this.state.pass_word
                                }
                            })
                                .then(response => {
                                    ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                    if(response.data != "아이디 또는 비밀번호가 잘못 되었습니다."){navigation.navigate("SelectRestaurant",{username : this.state.e_mail});}
                                })
                                .catch(function(error) {
                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                    // ADD THIS THROW error
                                    throw error;
                                });
                            //navigation.navigate("SelectRestaurant");
                            
                        }}
                    >
                        <Text style={letsGetStarted}>로그인</Text>
                    </TouchableOpacity>
                {/* </View> */}
                
                
            </View>
        );
    }
}


const layer = {
  fontFamily: "SCDream6",
  fontSize: 20,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: -0.53,
  textAlign: "center",
  color: "#ff1d30",
  marginBottom: 73
};

const loginStyle = {
  fontFamily: "AppleSDGothicNeo",
  fontSize: 30,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: "#3c2123",
  marginBottom: 46
};

const email = {
    fontFamily: "Avenir",
    fontSize: 25,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#b9c2ce"
  };

  const password = {
    fontFamily: "Avenir",
    fontSize: 25,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#b9c2ce"
  };


  const orderButton = {
    height: 70,
    //opacity: 0.51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff1d30"
    
  };

  const letsGetStarted = {
    fontFamily: "SCDream6",
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "white"
  };