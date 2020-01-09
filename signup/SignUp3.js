import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Header,  Body,  Title, Left, Right, CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';
import axios from 'axios';

export default class SignUp3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { progress: 2, empty: false, buttonColor: "#fadee2", pageTitle: "회원가입" }
  }

  onFill = (text) => {
    if (text === "") this.setState({empty: true, buttonColor: "#fadee2"});
    else this.setState({empty: false, buttonColor: "#ed6578"});
  }

  render() {
    return (
        <SafeAreaView style={styles.fullscreen}>
            
            <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
            <ProgressBar progress={this.state.progress}></ProgressBar>
            <View style={{flex:8, alignItems: "center"}}>
                <View style={{width: "100%", height: 88, alignItems: "center"}}>
                    <Text
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', borderBottomWidth: 1, fontSize: 24 }}
                    >아이디를 입력해주세요.</Text>
                    <View style={{width: "88.2%", flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                        <TextInput
                            style={{ width: "88.2%", height: 40, flex: 1, borderColor: 'gray', marginTop: 8}}
                            onChangeText={user_name => {
                                this.setState({user_name});
                                this.onFill(user_name); }}
                            maxLength={20}
                            placeholder="Haktal"
                        />
                        <TouchableOpacity style={{width: 60, height:32, alignItems:"center", borderRadius: 5, backgroundColor: "#ed6578", marginTop: 10}}
                            // onPress={() => this.props.navigation.navigate('SignUp4')}
                            activeOpacity={0.8}
                            disabled={this.state.empty}>
                            <Text style={{color: "white", padding: 5}}>재발송</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: "100%", height: 80, alignItems: "center", marginTop: 42}}>
                    <Text
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', borderBottomWidth: 1, fontSize: 24 }}
                    >비밀번호를 입력해주세요.</Text>
                    <TextInput
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', marginTop: 8}}
                        secureTextEntry = {true}
                        onChangeText={pass_word => {
                            this.setState({pass_word});
                            this.onFill(pass_word)}}
                        maxLength={20}
                        placeholder="****************"
                    />
                </View>
                <View style={{width: "100%", height: 80, alignItems: "center", marginTop: 42}}>
                    <Text
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', borderBottomWidth: 1, fontSize: 24 }}
                    >비밀번호를 재입력해주세요.</Text>
                    <TextInput
                        style={{ width: "88.2%", height: 40, borderColor: 'gray', marginTop: 8}}
                        secureTextEntry = {true}
                        onChangeText={pass_word_check => {
                            this.setState({pass_word_check});
                            this.onFill(pass_word_check)}}
                        maxLength={20}
                        placeholder="****************"
                    />
                </View>
            </View>
            <View style={{width: "100%", height: 0, alignItems:"center", flex: 1}}>
                <TouchableOpacity style={{width: "84.4%", height: 48, alignItems:"center", borderRadius: 50, backgroundColor: this.state.buttonColor}}
                    onPress={() => {
                        if(!this.state.user_name)
                        {
                            //이거 없다는 알림 + 진행 종료하는 로직
                        } 
                        else if(!this.state.pass_word)
                        {
                            //이거 없다는 알림 + 진행 종료하는 로직
                        }
                        else if(!this.state.pass_word_check)
                        {
                            //이거 없다는 알림 + 진행 종료하는 로직
                        }

                        axios.post('http://13.124.193.165:3000/users', {
                                params: {
                                    username : this.state.user_name,
                                    password : this.state.pass_word,
                                    passwordCheck : this.state.pass_word_check
                                }
                            })
                                .then(response => {
                                    ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                })
                                .catch(function(error) {
                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                // ADD THIS THROW error
                                throw error;
                                });
                        
                        //this.props.navigation.navigate('signUp6')
                    }}
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