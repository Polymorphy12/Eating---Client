import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet} from 'react-native';
import { Container, Header,  Body,  Title, Left, Right, CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';

export default class SignUp6 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { progress: 5, pageTitle: "회원가입" }
  }

  render() {
    return (
        <SafeAreaView style={styles.fullscreen}>

            <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

            <View style={{flex: 1, marginHorizontal: 16}}>
                <ProgressBar progress={this.state.progress}></ProgressBar>

                <Text
                    style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303'}}
                >회원가입이 완료되었습니다.</Text>

                <View style={{flex: 1, width: "100%", alignItems:"center", justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={{width: "84.4%", height: 48, alignItems:"center", justifyContent: 'center', borderRadius: 50, backgroundColor: '#ed6578', marginBottom: 60}}
                                        onPress={() => this.props.navigation.navigate('Home')}
                                        activeOpacity={0.8}>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, color: '#ffffff'}}>메인화면으로</Text>
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