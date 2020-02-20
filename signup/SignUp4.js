import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Header,  Body,  Title, Left, Right, CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';
import axios from 'axios';

export default class SignUp4 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 3,
            empty: true,
            pageTitle: "회원가입",
            _userName: props.navigation.getParam('userName'),
            receiveSMSBool: props.navigation.getParam('receiveSMSBool'),
            phoneNum: props.navigation.getParam('phoneNum'),
        }
    }

    onFill = (text) => {
        if (text.length !== 6) this.setState({empty: true});
        else this.setState({empty: false});
    }

    render() {
        return (
            <SafeAreaView style={styles.fullscreen}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <View style={{flex: 1, marginHorizontal: 16}}>
                    <ProgressBar progress={this.state.progress}></ProgressBar>

                    <Text
                        style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderColor: 'gray'}}
                        >인증번호를 입력해주세요.
                    </Text>

                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 24}}>
                        <TextInput
                            style={{flex: 218, fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0}}
                            onChangeText={text => this.onFill(text)}
                            maxLength={6}
                            keyboardType='number-pad'
                            placeholder="6자리 숫자 입력"
                            placeholderTextColor={'#d2d2d2'}
                        />
                        <View style={{flex: 70}}></View>
                        <TouchableOpacity style={{flex: 60, aspectRatio: 60 / 32, alignItems:"center", justifyContent: 'center', borderRadius: 8, backgroundColor: "#ed6578"}}
                            onPress={() => {
                                //ToastAndroid.show(`유저 이름: ${this.state._userName} \n옵션체크: ${this.state.receiveSMSBool ? 'true' : 'false'} \n연락처: ${this.state.phoneNum}`, ToastAndroid.SHORT);
                            }}
                            activeOpacity={0.8}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, letterSpacing: -0.2, color: '#ffffff'}}>재발송</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, width: "100%", alignItems:"center", justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={{width: "84.4%", aspectRatio: 304 / 48, alignItems:"center", justifyContent: 'center', borderRadius: 50, backgroundColor: this.state.empty ? '#fadee2' : '#ed6578', marginBottom: 60}}
                                            onPress={() => {
                                                this.props.navigation.navigate('signUp5', 
                                                    {   
                                                        userName: this.state._userName,
                                                        receiveSMSBool: this.state.receiveSMSBool,
                                                        phoneNum: this.state.phoneNum,
                                                    }
                                                );
                                            }}
                                            activeOpacity={0.8}
                                            disabled={this.state.empty}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, color: '#ffffff'}}>다음으로</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {width: "100%", height: "100%", flex: 1},
});