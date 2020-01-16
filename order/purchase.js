import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import CutLine from '../Component/CutLine';
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import axios from "axios";

export default class Purchase extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: "결제하기",
      username : props.navigation.getParam('username', ''),
      itemPressed : '0',
      data: [],
      price_info : {},
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
        const {navigation } = this.props;

        const temp = this.state.data;
        const order_history = [];

        console.log("temp" , temp);
        console.log("this.state" , this.state.data.length);

        let calculateProcess = "";
        let calculate = 0;
        //데이터 따라 scrollview에 넣어줄 컴포넌트.
        for(let i = 0; i < this.state.data.length; i++){
          order_history.push(
            <View style = {background} key = {i}>
                {/* 메뉴 사진 */}
                <Image style={{ 
                  width: 80, 
                  height : 86,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#979797"
                  }}>
                </Image>
                <View style = {locationInfoContainer}>
                    <Text style={locationName}>{this.state.data[i].restaurant_name}</Text>
                    <View>
                      <Text style={receivingTime}>{this.state.data[i].menu_name}</Text>
                      <Text style={receivingTime}>{this.state.data[i].amount}개</Text>
                    </View>
                    <Text style={receivingTime}>{this.state.data[i].menu_price}</Text>
                </View>
            </View>
          );
          
          if(i == 0)
            calculateProcess += this.state.data[i].menu_price + " * " + this.state.data[i].amount;
          else if (i+1 != this.state.data.length){
            calculateProcess += " + " + this.state.data[i].menu_price+ " * " + this.state.data[i].amount;
          } 
          else{
            calculateProcess += " = "
          }
        }
        
        return (
          <View style= {{ flex: 1 }}>
            
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.username}></OrderHeader>
            
            <ShoppingCartProgressBar progress={2}></ShoppingCartProgressBar>

            {/* 
            음식점 소개 부분 
            가로 정렬

            음식점 이미지 - 음식점 이름

            <View>
              <Image></Image>
              <Text></Text>
            </View>
            
            이건 이렇게 지금 넣을 게 아니라, sectioned로 해야 할 듯.
            */}
            

            {/* 주문 내역 */}
            
            <ScrollView>
              <View style = {{marginHorizontal : '3.9%', borderWidth : 1, borderStyle: "solid", borderRadius: 4, paddingTop: "3.478%"}}>
                {/* 상단 컨테이너 */}
                <View style = {{paddingHorizontal: "6.6%"}}>
                  {order_history}
                  {/* 
                    calculate container
                    전체 메뉴 가격 합산 결과를 계산하고,
                    계산 결과를 시각화 한다. 
                  */}
                  <View style = {{alignItems:"flex-end"}}>
                    <View style = {{flexDirection: "row"}}> 
                      <Text style = {{
                        fontFamily: "S-CoreDream-4",
                        fontSize: 17,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        lineHeight: 22,
                        letterSpacing: -0.21,
                        textAlign: "right",
                        color: "#686868"
                      }}>{calculateProcess}</Text> 
                      <Text style = {{
                        fontFamily: "S-CoreDream-4",
                        fontSize: 17,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        lineHeight: 22,
                        letterSpacing: -0.21,
                        textAlign: "right",
                        color: "#000"
                      }}>{this.state.price_info.total_price}</Text>
                    </View>
                  </View>
                </View>

                {/* 가운데 줄 */}
                <CutLine></CutLine>
                
                {/* 하단 컨테이너 */}
                <View style = {{paddingHorizontal: "6.6%"}}>
                  {/* 총 금액 결산 부분 */}
                  <Text style = {{fontFamily: "S-CoreDream-5", fontSize: 16, fontWeight: "500", fontStyle: "normal",
                  lineHeight: 22,letterSpacing: -0.23, textAlign: "left", color: "#000000"}}>총 금액</Text>

                  <View>
                    <View style={{marginLeft: '12.7%', marginVertical: '3.5%'}}>
                      <View style = {textContainerStyle}>
                        <Text style={leftTextStyle}>결제수단 : </Text>
                        <Text style={rightTextStyle}>무통장입금</Text>
                      </View>
                      <View style = {textContainerStyle}>
                        <Text style={leftTextStyle}>주문 금액 : </Text>
                        <Text style={rightTextStyle}> + {this.numberWithCommas(this.state.price_info.total_price)} 원</Text>
                      </View>
                      <View style = {textContainerStyle}>
                        <Text style={leftTextStyle}>할인 : </Text>
                        <Text style={rightTextStyle}>- {this.numberWithCommas(this.state.price_info.discount_price)} 원</Text>
                      </View>
                      <View style = {textContainerStyle}>
                        <Text style={leftTextStyle}>결제 금액 : </Text>
                        <Text style={rightTextStyle}>= {this.numberWithCommas(this.state.price_info.total_price - this.state.price_info.discount_price)} 원</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
            <View style={orderButtonContainer}>
                <TouchableOpacity
                    style={orderButton}
                    title="first"
                    onPress={() => {
                        navigation.navigate("purchaseFinalCheck");
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
  borderWidth: 1,
  borderColor: "#fee2cb",
  marginVertical: 4,
  flexDirection: 'row',
  alignItems: 'center'
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