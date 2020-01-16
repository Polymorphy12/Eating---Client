import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert } from "react-native";
import OrderHeader from "../Component/OrderHeader";
import CutLine from '../Component/CutLine';
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import MyFooter from "../Component/MyFooter";
import axios from "axios";

export default class PurchaseFinalCheck extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: "최종확인",
      username : props.navigation.getParam('username', ''),
      itemPressed : '0',
      data: [],
      price_info : {}
    }
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/purchase_summary/plan_summary',{
          params: {
            username : this.state.username
          }
      })
      .then(response => {
        console.log("ssss",response.data);
        //Alert.alert(JSON.stringify(response.data.menu_info), '');
        this.setState({data : response.data.menu_info, price_info : response.data.price_info});
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
            
                <OrderHeader 
                navigation={this.props.navigation} 
                pageTitle={this.state.pageTitle}
                username={this.state.username}></OrderHeader>
            
                <ShoppingCartProgressBar progress={3}></ShoppingCartProgressBar>   
                <ScrollView>
                    <View style = {{marginHorizontal : '3.9%', borderWidth : 1, borderStyle: "solid", borderRadius: 4, paddingTop: "3.478%"}}>
                        <View style={{paddingHorizontal: '6.6%'}}>
                            <Text style = {{fontFamily: "S-CoreDream-5", fontSize: 16, fontWeight: "500", fontStyle: "normal",
                                            lineHeight: 22,letterSpacing: -0.23, textAlign: "left", color: "#000000"}}>총 금액</Text>

                            <View style={{marginLeft: '12.7%', marginVertical: '3.5%'}}>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>결제수단 : </Text>
                                    <Text style={rightTextStyle}>무통장입금</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>주문 금액 : </Text>
                                    <Text style={rightTextStyle}>+ (총 구매 가격) 원</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>할인 : </Text>
                                    <Text style={rightTextStyle}>- (할인되는 가격) 원</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>결제 금액 : </Text>
                                    <Text style={rightTextStyle}>= (최종 가격) 원</Text>
                                </View>
                            </View>
                        </View>
                        <CutLine></CutLine>
                        <View style={{paddingHorizontal: '6.6%'}}>
                            <Text style = {{fontFamily: "S-CoreDream-5", fontSize: 16, fontWeight: "500", fontStyle: "normal",
                                            lineHeight: 22,letterSpacing: -0.23, textAlign: "left", color: "#000000"}}>배달정보</Text>

                            <View style={{marginLeft: '12.7%', marginVertical: '3.5%'}}>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>주문번호 : </Text>
                                    <Text style={rightTextStyle}>123523123</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>담당자 연락처 : </Text>
                                    <Text style={rightTextStyle}>010-0000-0000</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>배달시간 : </Text>
                                    <Text style={rightTextStyle}>오전 12시 00분</Text>
                                </View>
                                <View style = {textContainerStyle}>
                                    <Text style={leftTextStyle}>배달장소 : </Text>
                                    <Text style={rightTextStyle}>공학관</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: '2.5%'}}>
                            <Image style={{ 
                                width: 80, 
                                height : 86,
                                borderStyle: "solid",
                                borderWidth: 1,
                                borderColor: "#979797",
                                backgroundColor: 'red',
                                }}
                                source={{uri: 'http://13.124.193.165:3000/static/'}}
                                > 
                            </Image>
                            <Image style={{ 
                                width: 80, 
                                height : 86,
                                borderStyle: "solid",
                                borderWidth: 1,
                                borderColor: "#979797",
                                backgroundColor: 'red',
                                }}
                                source={{uri: 'http://13.124.193.165:3000/static/'}}> 
                            </Image>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, lineHeight: 22, letterSpacing: -0.21, color: '#686868'}}>유의사항: 길이 험해요</Text>
                        </View>

                    </View>         
                    <View style={orderButtonContainer}>
                        <TouchableOpacity
                            style={orderButton}
                            title="first"
                            onPress={() => {
                                this.props.navigation.navigate("orderHistory");
                            }}>
                            <Text style={letsGetStarted}>결제하기</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <MyFooter navigation={this.props.navigation} orderBoolean={true}></MyFooter>
            </View>
        );
    }
}

const orderButtonContainer = {
    alignItems: "center",
    justifyContent: "center",
    margin : 20
}

const orderButton = {
    width: 335,
    height: 58,
    borderRadius: 100,
    backgroundColor: "#ed6578",
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

const textContainerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const leftTextStyle = {
  fontFamily: 'S-CoreDream-4Regular',
  fontSize: 15,
  color: '#686868',
  lineHeight: 22,
  letterSpacing: -0.21
};

const rightTextStyle = {
  fontFamily: 'S-CoreDream-4Regular',
  fontSize: 15,
  color: '#000000',
  lineHeight: 22,
  letterSpacing: -0.21
};