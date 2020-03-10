import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Modal, ToastAndroid } from "react-native";
import axios from "axios";
import PlainListItem from "../Component/PlainListItem";
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";

export default class MyPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userEmail: props.navigation.getParam('userEmail'),
      pageTitle: "마이페이지" ,
      modalVisible: false,
      data: {},

    };
  };

  componentDidMount(){
    axios.post('http://13.124.193.165:3000/users/mypage',{
          params: {
            userEmail: this.state.userEmail,
          }
      })
      .then(response => {
        //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
        this.setState({data : response.data});
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
       throw error;
     });
  }

  render() {
    return (
      <View style= {{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

        <Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={{flex: 1, alignItems: 'center', backgroundColor : "#00000080"}}>
            <View style={{width: '75.6%', alignItems: 'flex-end', marginTop: 60}}>
              <TouchableOpacity style = {{marginRight: 8}} 
                                onPress = {() => {this.setState({modalVisible: false})}}>
                <Image style = {{width: 24, height : 24}} source={require('../assets/images/drawable-xxxhdpi/아이콘_닫기.png')}></Image>
              </TouchableOpacity>

              <View style={{width: '100%', aspectRatio: 272 / 480, backgroundColor: '#ffffff', marginTop: 17, padding: 16}}>
                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 17, letterSpacing: -0.41, color: '#000000'}}>잇힝 등급</Text>
                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 11, letterSpacing: -0.26, color: '#000000', marginTop: 12}}>잇힝은 회원님들의 구매 이력에 따른 결과를 등급으로 보여드리고 있습니다 :)</Text>

                <View style={{margin: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 70, height: 70}} source={require('../assets/images/drawable-xxxhdpi/rank_1_bronze.png')}></Image>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, color: '#707070', marginLeft: 26}}>브론즈</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 70, height: 70}} source={require('../assets/images/drawable-xxxhdpi/rank_2_silver.png')}></Image>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, color: '#707070', marginLeft: 26}}>실버</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 70, height: 70}} source={require('../assets/images/drawable-xxxhdpi/rank_3_gold.png')}></Image>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, color: '#707070', marginLeft: 26}}>골드</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 70, height: 70}} source={require('../assets/images/drawable-xxxhdpi/rank_4_platinum.png')}></Image>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, color: '#707070', marginLeft: 26}}>플래티넘</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 70, height: 70}} source={require('../assets/images/drawable-xxxhdpi/rank_5_diamond.png')}></Image>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 18, color: '#707070', marginLeft: 26}}>다이아</Text>
                    <Image style={{width: 16, height: 16, marginLeft: 4}} source={require('../assets/images/drawable-xxxhdpi/rank_5_diamond_deco.png')}></Image>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        
        <View style={{width: '100%', aspectRatio: 360 / 90, borderBottomWidth: 1, borderBottomColor: '#d8d8d8', paddingHorizontal: 16}}>
          <View style={{flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <Image style={{width: 48, height: 48, marginLeft: 16}}
                        source={this.state.data.user_rank === 1 ? require('../assets/images/drawable-xxxhdpi/rank_2_silver.png') :
                                this.state.data.user_rank === 2 ? require('../assets/images/drawable-xxxhdpi/rank_3_gold.png') :
                                this.state.data.user_rank === 3 ? require('../assets/images/drawable-xxxhdpi/rank_4_platinum.png') : 
                                this.state.data.user_rank === 4 ? require('../assets/images/drawable-xxxhdpi/rank_5_diamond.png') : require('../assets/images/drawable-xxxhdpi/rank_1_bronze.png')}/>
              </TouchableOpacity>

              <View style={{flex: 1, marginLeft: 24}}>
                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 17, letterSpacing: -0.41, color: '#6e6e6e'}}>{this.state.data.user_nickname}</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 17, letterSpacing: -0.41, color: '#000000'}}>{this.state.data.user_name}</Text>

                  <TouchableOpacity style={{borderRadius: 5, backgroundColor: '#666666'}}
                                    onPress={() => this.props.navigation.navigate('personalInfo', {userEmail: this.state.userEmail})}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#ffffff', paddingHorizontal: 13, paddingVertical: 5}}>개인정보 수정</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', aspectRatio: 360 / 42, paddingHorizontal: 16, alignItems: 'center'}}>
          <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 17, letterSpacing: -0.41, color: '#9b9b9b'}}>다음 등급은?</Text>
          <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 17, letterSpacing: -0.41, color: '#6e6e6e', marginLeft: 20}}>{this.state.data.user_rank === 0 ? '실버' :
                                                                                                                                    this.state.data.user_rank === 1 ? '골드' :
                                                                                                                                    this.state.data.user_rank === 2 ? '플래티넘' :
                                                                                                                                    this.state.data.user_rank === 3 ? '다이아몬드' : ''}</Text>
        </View>

        <View style={{height: 8, backgroundColor: '#d8d8d8'}}></View>

        <PlainListItem itemTitle='현재 주문 내역'     onPress={() => this.props.navigation.navigate('orderHistory', {userEmail: this.state.userEmail})}></PlainListItem>
        <PlainListItem itemTitle='즐겨찾는 메뉴 목록' onPress={() => this.props.navigation.navigate('bookmark', {userEmail: this.state.userEmail})}></PlainListItem>

        <View style={{height: 8, backgroundColor: '#d8d8d8'}}></View>

        <PlainListItem itemTitle='고객만족센터'       onPress={() => this.props.navigation.navigate('customerSatisfaction', {userEmail: this.state.userEmail})}></PlainListItem>
        <PlainListItem itemTitle='취소/환불 내역'     onPress={() => this.props.navigation.navigate('mypage')}></PlainListItem>
        <PlainListItem itemTitle='내가 쓴 리뷰'       onPress={() => this.props.navigation.navigate('mypage')}></PlainListItem>
        <PlainListItem itemTitle='공지사항'           onPress={() => this.props.navigation.navigate('mypage')}></PlainListItem>
        
        {/* <Text>{JSON.stringify(this.state.data)}</Text> */}

        {/* 풋터를 바닥에 두기 위한 빈 공간 */}
        <View style={{flex: 1}}></View>

        <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
      </View>
    );
  }
}