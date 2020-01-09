import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import PlainListItem from "../Component/PlainListItem";
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";

export default class MyPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { buttonColor: "#fadee2", pageTitle: "마이페이지" , isVisible: false};
  };
  
  


      render() {
        const {navigation } = this.props.navigation;
        return (
          <View style= {{ flex: 1 }}>
            <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
            <ScrollView contentContainerStyle = {totalContainer}>
              {/*
                컨테이너 1 : 
                  등급 이미지 + ({this.state.등급} + {this.state.이름 또는 this.props.이름}) +  수정 이미지 
              */}
                <View style = {background}>
                  {/*
                    랭크를 나타내는 모달.
                    컴포넌트화 시켜서 나중에 해야할 일을 덜자.
                  */}
                  <Modal
                    animationType = {"fade"}
                    transparent = {true}
                    visible = {this.state.isVisible}
                    onRequestClose = {() => {console.log("Modal has been closed.")}}
                  >
                    
                    <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor : "#00000080"
                            }}>
                      <View style = {{width : "75%", height : "75%", backgroundColor: "#fff" }}>
                        {/* 제목, 설명, 닫기 버튼 담는 컨테이너 */}
                        <View style = {{marginTop : "4.4%", marginBottom: "3.4%", marginLeft : "5.8%"}}>
                          {/* 제목, 닫기 버튼 담는 컨테이너 */}
                          <View style = {{flexDirection: 'row'}}>
                            
                            {/* 제목 */}
                            <Text style = {{marginBottom : "2%" ,fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                        fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#000000"}}>잇힝 등급</Text>
                            {/* 닫기 버튼 */}
                            <TouchableOpacity 
                            style = {{width: 24, height : 24, marginLeft : 'auto', marginRight : '6%'}} 
                            onPress = {() => {this.setState({isVisible: !this.state.isVisible})}}>
                              <Image
                              style = {{width: 24, height : 24}}
                              source={require('../assets/images/drawable-xxxhdpi/아이콘_닫기.png')}>
                              </Image>
                            </TouchableOpacity>
                          </View>
                          
                          {/* 설명 */}
                          <Text style = {{fontFamily: "S-CoreDream4", fontSize: 11,fontWeight: "200",fontStyle: "normal",lineHeight: 13,
                                          letterSpacing: -0.26,textAlign: "left", color: "#000000"}}>
                                            잇힝은 회원님들의 구매 이력에 따른 결과를 등급으로 보여드리고 있습니다 :)</Text>

                        </View>
                        {/* 등급 담는 컨테이너 */}
                        <View style = {{marginLeft : "13.97%", justifyContent : 'center'}}>
                          <View style = {{flexDirection : 'row', alignItems: 'center', margin: "0.84%"}}>
                            <Image
                            style = {{width: 60, height : 60}}
                            source={require('../assets/images/drawable-xxxhdpi/고객등급_브론즈.png')}>
                            </Image>
                            <Text style = {{marginLeft : "10%",fontFamily: "S-CoreDream6",fontSize: 18,fontWeight: "bold",fontStyle: "normal",lineHeight: 22,
                            letterSpacing: 0,textAlign: "left",color: "#707070"}}>브론즈</Text>
                          </View>
                          <View style = {{flexDirection : 'row', alignItems: 'center', margin: "0.84%"}}>
                            <Image
                            style = {{width: 60, height : 60}}
                            source={require('../assets/images/drawable-xxxhdpi/고객등급_실버.png')}>
                            </Image>
                            <Text style = {{marginLeft : "10%",fontFamily: "S-CoreDream6",fontSize: 18,fontWeight: "bold",fontStyle: "normal",lineHeight: 22,
                            letterSpacing: 0,textAlign: "left",color: "#707070"}}>실버</Text>
                          </View>
                          <View style = {{flexDirection : 'row', alignItems: 'center', margin: "0.84%"}}>
                            <Image
                            style = {{width: 60, height : 60}}
                            source={require('../assets/images/drawable-xxxhdpi/고객등급_골드.png')}>
                            </Image>
                            <Text style = {{marginLeft : "10%",fontFamily: "S-CoreDream6",fontSize: 18,fontWeight: "bold",fontStyle: "normal",lineHeight: 22,
                            letterSpacing: 0,textAlign: "left",color: "#707070"}}>골드</Text>
                          </View>
                          <View style = {{flexDirection : 'row', alignItems: 'center', margin: "0.84%"}}>
                            <Image
                            style = {{width: 60, height : 60}}
                            source={require('../assets/images/drawable-xxxhdpi/고객등급_플래티넘.png')}>
                            </Image>
                            <Text style = {{marginLeft : "10%",fontFamily: "S-CoreDream6",fontSize: 18,fontWeight: "bold",fontStyle: "normal",lineHeight: 22,
                            letterSpacing: 0,textAlign: "left",color: "#707070"}}>플래티넘</Text>
                          </View>
                          <View style = {{flexDirection : 'row', alignItems: 'center', margin: "0.84%"}}>
                            <Image
                            style = {{width: 60, height : 60}}
                            source={require('../assets/images/drawable-xxxhdpi/고객등급_다이아.png')}>
                            </Image>
                            <Text style = {{marginLeft : "10%",fontFamily: "S-CoreDream6",fontSize: 18,fontWeight: "bold",fontStyle: "normal",lineHeight: 22,
                            letterSpacing: 0,textAlign: "left",color: "#707070"}}>다이아</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <TouchableOpacity 
                  style={{width: 60, height : 60, marginRight : "7.8%", marginLeft: "4.4%"}}
                  onPress = {() => {this.setState({isVisible: true})}}>
                  <Image
                    style = {{width: 60, height : 60, marginRight : "7.8%", marginLeft: "4.4%"}}
                    source={require('../assets/images/drawable-xxxhdpi/고객등급_브론즈.png')}>

                  </Image>
                  </TouchableOpacity>
                  
                  <View style = {{flexDirection: 'column' }}>
                    <Text
                    style = {{width: 76, height: 20, fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#6e6e6e"}}
                    >브론즈 </Text>
                    <Text
                    style = {{width: 76, height: 20, fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#000000"}}
                    >나이름</Text>
                  </View>
                  <Image 
                  style = {{width: 60, height : 60, marginLeft: 'auto', marginRight: '6.67%'}}
                  source={require('../assets/images/drawable-xxxhdpi/아이콘_수정.png')}></Image>
                </View>
              {/*
                컨테이너 2 : 가로 정렬.
                  ("다음 등급은?" + 다음등급) 
              */}
                <View style = {{flexDirection : 'row', paddingTop:"1.25%",paddingBottom:"1.25%", 
                borderTopWidth: 1, borderBottomWidth: 1, borderColor:"#d8d8d8"}}>
                    <Text
                    style = {{height: 20, marginLeft: "4.4%", marginRight:"5.9%", fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#9b9b9b"}}>다음 등급은?</Text>
                    <Text
                    style = {{height: 20, fontFamily: "S-CoreDream4", fontSize: 17, fontWeight: "200", 
                    fontStyle: "normal", lineHeight: 20, letterSpacing: -0.41, textAlign: "left", color: "#6e6e6e"}}>실버</Text>
                </View>
                <View style = {{height : "1.25%", backgroundColor : "#d8d8d8"}}></View>
              {/*
                컨테이너 3 : 윗쪽 정렬.
                  Touchable Opacity (고객 만족 센터)
                  Touchable Opacity (취소/환불 내역)
                  Touchable Opacity (리뷰 관리)
                  Touchable Opacity (학식탈출 안내)
              */}
                <View>
                  <PlainListItem itemTitle = "고객만족센터" 
                  navigation = {this.props.navigation} 
                  onPress = {() => {
                    this.props.navigation.navigate("CustomerSatisfaction");
                  }}/>
                  <PlainListItem itemTitle = "취소/환불 내역"/>
                  <PlainListItem itemTitle = "리뷰 관리"/>
                  <PlainListItem itemTitle = "잇힝 안내"
                  navigation = {this.props.navigation} 
                  onPress = {() => {
                    this.props.navigation.navigate("Announcement");
                  }}/>
                </View>
            </ScrollView>
              
            <MyFooter navigation={this.props.navigation}></MyFooter>
            
            {/* <View style={orderButtonContainer}>
                <TouchableOpacity
                    style={orderButton}
                    title="first"
                    onPress={() => {
                        // navigation.navigate("logIn");
                    }}>
                    <Text style={letsGetStarted}>확인</Text>
                </TouchableOpacity>
            </View> */}
          </View>
        );
      }
}

const totalContainer = {
  flex: 1,
  backgroundColor: "white",
  // alignItems: "center",
  //justifyContent: "center",
  zIndex: -1
}

const titleText = {
  // width: 225.6,
  // height: 25,
  fontFamily: "AppleSDGothicNeo",
  fontSize: 23,
  fontWeight: "800",
  fontStyle: "normal",
  // lineHeight: 25,
  letterSpacing: -0.24,
  textAlign: "center",
  color: "#ffffff"
};


const background = {
  height: 160,
  borderRadius: 4,
  backgroundColor: '#fff',
  borderStyle: "solid",
  borderWidth: 0,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth : 1,
  borderTopColor: "#f0f0f0",
};

const listView = {
//   // flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
}

const locationInfoContainer = {
    margin: 35
}

const locationName = {
  
  fontFamily: "S-CoreDream-5",
  fontSize: 17,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#273951"
}

const receivingTime = {
  fontFamily: "S-CoreDream-5",
  fontSize: 13,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#a2a9b3"
}


const navBar = {
  height: 70,
  //opacity: 0.51,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ff1d30"
};

const orderButtonContainer = {
    alignItems: "center",
    justifyContent: "center",
    margin : 20
}

const orderButton = {
    width: 335,
    height: 58,
    borderRadius: 100,
    backgroundColor: "#ff3345",
    alignItems: "center",
    justifyContent: "center"
};



const letsGetStarted = {
    fontFamily: "SCDream6",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
};