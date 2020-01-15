import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Header,  Body,  Title, Left, Right, CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';

export default class SignUp5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        progress: 4,
        empty: true,
        buttonColor: "#fadee2",
        pageTitle: "회원가입",
        _userName: props.navigation.getParam('userName'),
        optionalCheckBoxChecked: props.navigation.getParam('optionalCheckBoxChecked'),
        phoneNum: props.navigation.getParam('phoneNum'),
    }
  }

  onFill = (text) => {
    if (text.length !== 6) this.setState({empty: true, buttonColor: "#fadee2"});
    else this.setState({empty: false, buttonColor: "#ed6578"});
  }

  render() {
    return (
        <SafeAreaView style={styles.fullscreen}>

            <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
            <ProgressBar progress={this.state.progress}></ProgressBar>
            <View style={{width: "100%", height: 88, alignItems: "center", flex: 8}}>
                <View style={{width: "100%", height: 88, alignItems: "center"}}>
                    <Text
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', borderBottomWidth: 1, fontSize: 24 }}
                        >인증번호를 입력해주세요.
                    </Text>
                    <View style={{width: "88.2%", flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                        <TextInput
                            style={{ width: "88.2%", height: 40, borderColor: 'gray', marginTop: 8, flex: 1}}
                            onChangeText={text => this.onFill(text)}
                            maxLength={6}
                            placeholder="123456"
                        />
                        <TouchableOpacity style={{width: 60, height:32, alignItems:"center", borderRadius: 5, backgroundColor: "#ed6578", marginTop: 10}}
                            onPress={() => {
                                ToastAndroid.show(`유저 이름: ${this.state._userName} \n옵션체크: ${this.state.optionalCheckBoxChecked ? 'true' : 'false'} \n연락처: ${this.state.phoneNum}`, ToastAndroid.SHORT);
                            }}
                            activeOpacity={0.8}>
                            <Text style={{color: "white", padding: 5}}>재발송</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
            <View style={{width: "100%", height: 0, alignItems:"center", flex: 1}}>
                <TouchableOpacity style={{width: "84.4%", height: 48, alignItems:"center", borderRadius: 50, backgroundColor: this.state.buttonColor}}
                    onPress={() => this.props.navigation.navigate('signUp6')}
                    activeOpacity={0.8}
                    disabled={this.state.empty}>
                    <Text style={{color: "white", fontSize: 20, padding: 10}}>학식 탈출하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {width: "100%", height: "100%", flex: 1},
});