import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, StyleSheet, ToastAndroid} from 'react-native';
//import { CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';
import CheckBox from 'react-native-check-box';

export default class SignUp1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      mendatoryCheckBoxChecked: false,
      eatingCheckBoxChecked: false,
      EFCheckBoxChecked: false,
      personalInfoCheckBoxChecked: false,
      receiveSMSBool: false,
      pageTitle: "회원가입",
    }
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

          <View style={{marginHorizontal: 16, marginBottom: 18}}>
            <ProgressBar progress={this.state.progress}></ProgressBar>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => this.setState(
                                    {
                                      mendatoryCheckBoxChecked: !this.state.mendatoryCheckBoxChecked,
                                      eatingCheckBoxChecked: !this.state.mendatoryCheckBoxChecked,
                                      EFCheckBoxChecked: !this.state.mendatoryCheckBoxChecked,
                                      personalInfoCheckBoxChecked: !this.state.mendatoryCheckBoxChecked,
                                    }
                                  )}>
                <View style={{width: 20, height: 20, borderRadius: 100, borderWidth: 2, borderColor: this.state.mendatoryCheckBoxChecked ? '#ed6578' : '#757575', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: this.state.mendatoryCheckBoxChecked ? '#ed6578' : '#ffffff'}}></View>
                </View>
              </TouchableOpacity>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, letterSpacing: -0.25, color: '#000000', marginLeft: 16}}>필수 항목 모두 동의</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#f5f5f5', paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, marginBottom: 18}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox isChecked={this.state.eatingCheckBoxChecked}
                          checkedCheckBoxColor={'#ed6578'}
                          uncheckedCheckBoxColor={'#717171'}
                          onClick={() => {
                            this.setState({eatingCheckBoxChecked: !this.state.eatingCheckBoxChecked});
                            if (!this.state.eatingCheckBoxChecked && this.state.EFCheckBoxChecked && this.state.personalInfoCheckBoxChecked) this.setState({mendatoryCheckBoxChecked: true});
                            else this.setState({mendatoryCheckBoxChecked: false});
                          }}></CheckBox>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:16, letterSpacing: -0.23, color: '#000000', marginLeft: 16}}>잇힝 이용약관</Text>
              </View>

              <TouchableOpacity style={{backgroundColor: '#ffffff', width: '15.9%', aspectRatio: 52 / 20, borderRadius: 8, borderWidth: 1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 10, letterSpacing: -0.14, color: '#000000'}}>내용확인</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox isChecked={this.state.EFCheckBoxChecked}
                          checkedCheckBoxColor={'#ed6578'}
                          uncheckedCheckBoxColor={'#717171'}
                          onClick={() => {
                            this.setState({EFCheckBoxChecked: !this.state.EFCheckBoxChecked});
                            if (this.state.eatingCheckBoxChecked && !this.state.EFCheckBoxChecked && this.state.personalInfoCheckBoxChecked) this.setState({mendatoryCheckBoxChecked: true});
                            else this.setState({mendatoryCheckBoxChecked: false});
                          }}></CheckBox>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:16, letterSpacing: -0.23, color: '#000000', marginLeft: 16}}>전자금융거래 이용약관</Text>
              </View>

              <TouchableOpacity style={{backgroundColor: '#ffffff', width: '15.9%', aspectRatio: 52 / 20, borderRadius: 8, borderWidth: 1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 10, letterSpacing: -0.14, color: '#000000'}}>내용확인</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox isChecked={this.state.personalInfoCheckBoxChecked}
                          checkedCheckBoxColor={'#ed6578'}
                          uncheckedCheckBoxColor={'#717171'}
                          onClick={() => {
                            this.setState({personalInfoCheckBoxChecked: !this.state.personalInfoCheckBoxChecked});
                            if (this.state.eatingCheckBoxChecked && this.state.EFCheckBoxChecked && !this.state.personalInfoCheckBoxChecked) this.setState({mendatoryCheckBoxChecked: true});
                            else this.setState({mendatoryCheckBoxChecked: false});
                          }}></CheckBox>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize:16, letterSpacing: -0.23, color: '#000000', marginLeft: 16}}>개인정보 수집이용</Text>
              </View>

              <TouchableOpacity style={{backgroundColor: '#ffffff', width: '15.9%', aspectRatio: 52 / 20, borderRadius: 8, borderWidth: 1, borderColor: '#000000', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 10, letterSpacing: -0.14, color: '#000000'}}>내용확인</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginHorizontal: 16, marginTop: 18}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => this.setState({receiveSMSBool: !this.state.receiveSMSBool})}>
                <View style={{width: 20, height: 20, borderRadius: 100, borderWidth: 2, borderColor: this.state.receiveSMSBool ? '#ed6578' : '#757575', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: this.state.receiveSMSBool ? '#ed6578' : '#ffffff'}}></View>
                </View>
              </TouchableOpacity>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, letterSpacing: -0.25, color: '#000000', marginLeft: 16}}>(선택) 마케팅 정보 메일 SMS 수신</Text>
            </View>
          </View>

          <View style={{flex: 1, width: "100%", alignItems:"center", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{width: "84.4%", aspectRatio: 304 / 48, alignItems:"center", justifyContent: 'center', borderRadius: 50, backgroundColor: this.state.mendatoryCheckBoxChecked ? '#ed6578' : '#fadee2', marginBottom: 60}}
                              disabled={!this.state.mendatoryCheckBoxChecked}
                              onPress={() => this.props.navigation.navigate('signUp2', {receiveSMSBool: this.state.receiveSMSBool})}
                              activeOpacity={0.8}>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, color: '#ffffff'}}>다음으로</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  fullscreen: {width: "100%", height: "100%", flex: 1},
});