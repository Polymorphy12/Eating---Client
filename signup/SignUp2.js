import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, StyleSheet, ToastAndroid} from 'react-native';
import { CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';

export default class SignUp2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 1,
      blocked: true,
      mendatoryCheckBoxChecked: false,
      mendatoryCheckBoxColor: 'white',
      mendatoryCheckBoxBorderColor: 'black',
      optionalCheckBoxChecked: false,
      optionalCheckBoxColor: 'white',
      optionalCheckBoxBorderColor: 'black',
      buttonColor: "#fadee2",
      pageTitle: "회원가입",
      _userName: props.navigation.getParam('userName'),
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.fullscreen}>
        <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
        <ProgressBar progress={this.state.progress}></ProgressBar>

        <View style={{flex: 8, backgroundColor:"red"}}>
          <View style={{flex: 0.5, flexDirection:"row", backgroundColor:"blue"}}>
            <View style={{flex:1, backgroundColor:"green"}}>
              <View style={{flex:1, flexDirection:"column", alignItems:"center", justifyContent:"center", }}>
                <TouchableOpacity style={{width:16, height:16, borderRadius:40, borderColor: this.state.mendatoryCheckBoxBorderColor, borderWidth:1, backgroundColor: "white", alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => {
                                    this.setState({
                                      buttonColor: !this.state.mendatoryCheckBoxChecked ? '#f08b98' : '#fadee2',
                                      mendatoryCheckBoxColor: !this.state.mendatoryCheckBoxChecked ? '#d54565' : 'white',
                                      mendatoryCheckBoxBorderColor: !this.state.mendatoryCheckBoxChecked ? '#d54565' : 'black',
                                      mendatoryCheckBoxChecked: !this.state.mendatoryCheckBoxChecked,
                                      blocked: !this.state.blocked,
                                    })
                                  }}>
                  <View style={{width:10, height:10, borderRadius:40, backgroundColor: this.state.mendatoryCheckBoxColor}}></View>
                </TouchableOpacity>
              </View>
              <View style={{flex:2, backgroundColor:"black"}}></View>
              <View style={{flex:1, flexDirection:"column", alignItems:"center", justifyContent:"center", }}>
              <TouchableOpacity style={{width:16, height:16, borderRadius:40, borderColor: this.state.optionalCheckBoxBorderColor, borderWidth:1, backgroundColor: "white", alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => this.setState({
                                    optionalCheckBoxColor: !this.state.optionalCheckBoxChecked ? '#d54565' : 'white',
                                    optionalCheckBoxBorderColor: !this.state.optionalCheckBoxChecked ? '#d54565' : 'black',
                                    optionalCheckBoxChecked: !this.state.optionalCheckBoxChecked
                                    })}>
                  <View style={{width:10, height:10, borderRadius:40, backgroundColor: this.state.optionalCheckBoxColor}}></View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:6, backgroundColor:"violet"}}>
              <View style={{flex:1, justifyContent:"center", }}>
                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize:16, letterSpacing: -0.23}}>필수 항목 모두 동의</Text>
              </View>
              <View style={{flex:2, flexDirection:"column", justifyContent:"space-around", backgroundColor: "white"}}>
                <Text>잇힝이용약관</Text>
                <Text>전자금융거래 이용약관</Text>
                <Text>개인정보 수집이용</Text>
              </View>
              <View style={{flex:1, justifyContent:"center", }}>
                <Text style={{fontSize:15}}>(선택) 마케팅 정보 메일 sms 수신</Text>
              </View>
            </View>
            <View style={{flex:3, }}>
              <View style={{flex:1, }}></View>
              <View style={{flex:2, flexDirection:"column", justifyContent:"space-around", alignItems:"center", backgroundColor:"white"}}>
                <TouchableOpacity style={{width:"60%", borderRadius:4, borderColor:"black", borderWidth:2, alignItems:"center", backgroundColor:"white"}}><Text>내용확인</Text></TouchableOpacity>
                <TouchableOpacity style={{width:"60%", borderRadius:4, borderColor:"black", borderWidth:2, alignItems:"center", backgroundColor:"white"}}><Text>내용확인</Text></TouchableOpacity>
                <TouchableOpacity style={{width:"60%", borderRadius:4, borderColor:"black", borderWidth:2, alignItems:"center", backgroundColor:"white"}}><Text>내용확인</Text></TouchableOpacity>
              </View>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{width:"60%", borderRadius:4, borderColor:"black", borderWidth:2, alignItems:"center", backgroundColor:"white"}}><Text>내용확인</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <Text style={{flex: 8}}>약관동의항목</Text> */}
        
        <View style={{width: "100%", height: 0, alignItems:"center", flex: 1}}>
          <TouchableOpacity style={{width: "84.4%", height: 48, alignItems:"center", borderRadius: 50, backgroundColor: this.state.buttonColor}}
            onPress={() => this.props.navigation.navigate('signUp3', {userName: this.state._userName, optionalCheckBoxChecked: this.state.optionalCheckBoxChecked})}
            activeOpacity={0.8}
            disabled={this.state.blocked}>
            <Text style={{color: "white", fontSize: 20, padding: 10}}>학식 탈출하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
        // <Header style={navBar}>
        //   <Left style = {{flex:1}}>
        //     <TouchableOpacity
        //     onPress={() => {
        //       navigation.goBack();
        //     }}><Image
        //     style={{width:23, height:23}}
        //     source={require('../assets/images/drawable-xxhdpi/아이콘_뒤로가기.png')}
        //     >
        //     </Image></TouchableOpacity>
        //   </Left>
        //   <Title style={titleText}> 업체 선택</Title>
        //   <Right style = {{flex:1}}>
        //     <Image
        //       style={{width:27, height:23, marginRight: 10}}
        //       source={require('../assets/images/drawable-xxhdpi/아이콘_장바구니.png')}
        //       >
        //     </Image>
        //   </Right>
        // </Header>
      );
    }
}

const styles = StyleSheet.create({
  fullscreen: {width: "100%", height: "100%", flex: 1},
});