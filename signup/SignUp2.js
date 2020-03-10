import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet} from 'react-native';
import { Container, Body,  Title, Left, Right, Footer, FooterTab } from 'native-base';
// import { MyHeader, ProgressBar } from './Component';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';

export default class SignUp2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 1,
      empty: true,
      pageTitle: "회원가입",
      _userName: '',
      receiveSMSBool: props.navigation.getParam('receiveSMSBool'),
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
        
        <View style={{flex: 1, marginHorizontal: 16}}>
          <ProgressBar progress={this.state.progress}></ProgressBar>

          {/* 이름 입력칸 */}
          <Text
            style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderColor: 'gray'}}
          >이름을 입력해주세요.</Text>

          <TextInput
            style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0, marginTop: 32}}
            onChangeText={_userName => this.setState({_userName})}
            maxLength={12}
            placeholder="김유니"
            placeholderTextColor={'#d2d2d2'}
            returnKeyType={'next'}
            onSubmitEditing={() => { this.userNicknameTextInput.focus(); }}
            blurOnSubmit={false}
          />

          {/* 닉네임 입력칸 */}
          <Text
            style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderColor: 'gray', marginTop: 32}}
          >닉네임을 입력해주세요.</Text>

          <TextInput
            style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0, marginTop: 32}}
            onChangeText={userNickname => this.setState({userNickname})}
            maxLength={20}
            placeholder="머랭이"
            placeholderTextColor={'#d2d2d2'}
            ref={(input) => { this.userNicknameTextInput = input; }}
          />

          {/* <Text>{JSON.stringify(this.state)}</Text> */}

          <View style={{flex: 1, width: "100%", alignItems:"center", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{width: "84.4%", aspectRatio: 304 / 48, alignItems:"center", justifyContent: 'center', borderRadius: 50, backgroundColor: (!this.state._userName || !this.state.userNickname) ? '#fadee2' : '#ed6578', marginBottom: 60}}
              onPress={() => this.props.navigation.replace('signUp3', {userName: this.state._userName, userNickname: this.state.userNickname, receiveSMSBool: this.state.receiveSMSBool})}
              activeOpacity={0.8}
              disabled={!this.state._userName || !this.state.userNickname}>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, color: '#ffffff'}}>다음으로</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}
      

      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      //   <Header>
      //     <Title>업체</Title>
      //   </Header>
      //   <Text>Home Screen</Text>
      //   <Button style={{ width:}}
      //     title="Go to dance"
      //     onPress={() => this.props.navigation.navigate('Detail')}
      //   />
      // </View>


{/* <Button
  title="Go to dance"
  onPress={() => this.props.navigation.navigate('Detail')}
/> */}
