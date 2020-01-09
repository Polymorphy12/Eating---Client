import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet} from 'react-native';
import { Container, Body,  Title, Left, Right, Footer, FooterTab } from 'native-base';
// import { MyHeader, ProgressBar } from './Component';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';

export default class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, empty: false, buttonColor: "#fadee2", pageTitle: "회원가입" };
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

        <View style={{width: "100%", height: 44, alignItems: "center", flex: 8}}>
          <Text
            style={{ width: "88.2%", height: 40, borderColor: 'gray', borderBottomWidth: 1, fontSize: 24 }}
          >이름을 입력해주세요.</Text>
          <TextInput
            style={{ width: "88.2%", height: 40, borderColor: 'gray', marginTop: 8}}
            onChangeText={text => this.onFill(text)}
            maxLength={12}
            placeholder="김유니"
          />
        </View>
        <View style={{width: "100%", height: 0, alignItems:"center", flex: 1}}>
          <TouchableOpacity style={{width: "84.4%", height: 48, alignItems:"center", borderRadius: 50, backgroundColor: this.state.buttonColor}}
            onPress={() => this.props.navigation.navigate('SignUp2')}
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
