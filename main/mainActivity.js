import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity } from "react-native";

export default class MainActivity extends Component {
    render() {
        const { navigation } = this.props;
        return (

            <ImageBackground
                source={require('../assets/images/drawable-hdpi/intro1.png')}
                style={{
                    flex: 1,
                    backgroundColor: "grey",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {/* 제목 */}
                <Text style={mainTitle}> 학식탈출 </Text>

                {/* 
                    제목 밑에 공간 있어요 
                    여기다가 캐러셀 넣어줘야 함
                */}
                <View style={hitArea}>
                    <Text style={noMoreGimcheon}></Text>
                </View>

                {/*  */}
                <TouchableOpacity
                    style={orderButton}
                    title="first"
                    onPress={() => {
                        navigation.navigate("LogIn");
                    }}
                >
                    <Text style={letsGetStarted}>점심/저녁 주문하기!!!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={signIn}
                onPress= {() => {
                    navigation.navigate("signUp3");
                }}>
                    <Text style={signIn3}>새로 오셨어요? </Text>
                    <Text style={signIn2}>회원가입 하기!</Text>
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
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: {
        width: 0,
        height: 2
    },
    textShadowRadius: 4
};

const orderButton = {
    width: 335,
    height: 58,
    borderRadius: 100,
    // backgroundColor: "#ff3345",
     backgroundColor: "#ed6578",
    alignItems: "center",
    justifyContent: "center"
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