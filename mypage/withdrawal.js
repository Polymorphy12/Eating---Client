import React, { Component } from "react";
import {Text, TextInput, View, TouchableOpacity, Image, StyleSheet,} from 'react-native';
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
            graduationCheckBoxChecked: false,
            securityCheckBoxChecked: false,
            restaurantCheckBoxChecked: false,
            functionCheckBoxChecked: false,
            somethingElseCheckBoxChecked: false,
        }
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <ScrollView contentContainerStyle = {totalContainer}>
                    <View style={{marginHorizontal: '8.3%', marginTop: '8.3%',}}>
                        <Text style={{fontFamily: "S-CoreDream4-ExtraLight", fontSize: 13, fontWeight: "200", 
                                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{`그동안 잇힝을 이용해 주셔서 감사합니다!\n회원님께서 학식탈출을 탈퇴하는 이유를 알려주시면 보다 좋은 서비스 제공을 위해 노력하겠습니다.`}</Text>
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
                                        isChecked={this.state.functionCheckBoxChecked}
                                        onClick={() => {this.setState({functionCheckBoxChecked: !this.state.functionCheckBoxChecked})}}
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
                                        multiline={true}></TextInput>

                            <Text style={{marginTop: '10%'}}>마지막으로 해 주실 한 마디가 있나요?</Text>

                            <TextInput style={TextInputStyle}
                                        multiline={true}></TextInput>

                            <View style={{alignItems: 'center', marginTop: 27.5}}>
                                <TouchableOpacity style={{width: 65, height: 26, borderRadius: 4, backgroundColor: '#666666', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 15, color: '#ffffff'}}>탈퇴</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    // alignItems: "center",
    //justifyContent: "center",
    zIndex: -1
};

const checkBoxElementViewStyle = {
    flexDirection: 'row',
    marginTop: 17,
}

const checkBoxTextStyle = {
    fontSize: 13,
    marginLeft: '3.6%',
    color: '#000000',
}

const TextInputStyle = {
    height: 70,
    fontSize: 11,
    marginTop: '5.5%',
    borderWidth: 1,
    borderColor: '#707070',
}