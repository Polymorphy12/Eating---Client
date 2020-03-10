import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import CheckBox from 'react-native-check-box';
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import axios from "axios";

export default class Purchase extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: "배달 주문하기",
      userEmail : props.navigation.getParam('userEmail', ''),
      timeSelect : props.navigation.getParam('timeSelect'),
      deliv_date: props.navigation.getParam('deliv_date'),

      // 구버전의 잔재, 혹시 몰라 남겨둠
      data: [],
      // itemPressed : '0',
      // price_info : {},

      totalPrice: 0,
      paymentMethod: '무통장입금',
      cashReceiptBool: false,
      cashReceiptPersonalBool: true,
      cashReceiptBusinessBool: false,
      cashReceiptPhoneNum: '',
    }
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  componentDidMount(){
    // axios.get('http://13.124.193.165:3000/purchase_summary/plan_summary',{
    //       params: {
    //         userEmail : this.state.userEmail,
    //         timeSelect : this.state.timeSelect,
    //       }
    //   })
    //   .then(response => {
    //     console.log("ssss",response.data);
    //     //Alert.alert(JSON.stringify(response.data.menu_info), '');
    //     this.setState({data : response.data.menu_info, price_info : response.data.price_info,});
    //   })
    //   .catch(function(error) {
    //     console.log('There has been a problem with your fetch operation: ' + error.message);
    //   // ADD THIS THROW error
    //    throw error;
    // });

    axios.get('http://13.124.193.165:3000/purchase_summary/getTotalPrice',{
          params: {
            userEmail : this.state.userEmail,
            timeSelect : this.state.timeSelect,
          }
      })
      .then(response => {
        if (response.data === -1) {
          ToastAndroid.show('시스템에 문제가 생겼습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
        }
        else {
          this.setState({totalPrice: response.data});
        }
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
  }
    

  render() {
    // const {navigation } = this.props;

    // const temp = this.state.data;
    // const order_history = [];

    // // console.log("temp" , temp);
    // // console.log("this.state" , this.state.data.length);

    // let calculateProcess = "";
    // let calculate = 0;
    // //데이터 따라 scrollview에 넣어줄 컴포넌트.
    // for(let i = 0; i < this.state.data.length; i++){
    //   order_history.push(
    //     <View style = {background} key = {i}>
    //         {/* 메뉴 사진 */}
    //         <Image style={{width: 80, height : 86, borderWidth: 1, borderColor: "#979797"}}
    //                 source={{uri: 'http://13.124.193.165:3000/static/' + this.state.data[i].menu_image}}>
    //         </Image>
    //         <View style = {locationInfoContainer}>
    //             <Text style={locationName}>{this.state.data[i].restaurant_name}</Text>
    //             <View>
    //               <Text style={receivingTime}>{this.state.data[i].menu_name}</Text>
    //               <Text style={receivingTime}>{this.state.data[i].amount}개</Text>
    //             </View>
    //             <Text style={receivingTime}>{this.state.data[i].menu_price}</Text>
    //         </View>
    //     </View>
    //   );
      
    //   if(i == 0)
    //     calculateProcess += this.numberWithCommas(this.state.data[i].menu_price) + " * " + this.state.data[i].amount;
    //   else if (i < this.state.data.length) {
    //     calculateProcess += " + " + this.numberWithCommas(this.state.data[i].menu_price)+ " * " + this.state.data[i].amount;
    //   } 
    //   if (i == this.state.data.length - 1) {
    //     calculateProcess += " = "
    //   }
    // }
    
    return (
      <View style= {{ flex: 1 }}>
        
        <OrderHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle} username={this.state.userEmail}></OrderHeader>        
        <ShoppingCartProgressBar progress={2}></ShoppingCartProgressBar>

        <ScrollView style={{borderWidth: 1, borderRadius: 5, marginHorizontal: 16, marginTop: 8, padding: 16}}>
          <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000'}}>결제하기</Text>

          <TouchableOpacity style={{width: '48.6%', aspectRatio: 3, borderWidth: 1, borderRadius: 100, borderColor: this.state.paymentMethod === '무통장입금' ? '#ed6578' : '#eeeeee', alignItems: 'center', justifyContent: 'center', marginTop: 16}}
                            onPress={() => this.setState({paymentMethod: '무통장입금'})}>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 20, letterSpacing: -1, color: this.state.paymentMethod === '무통장입금' ? '#ed6578' : '#eeeeee'}}>무통장입금</Text>
          </TouchableOpacity>

          <Text style={{fontFamily: 'S-CoreDream-3Light', fontSize: 12, letterSpacing: -0.6, color: '#979797', marginTop: 16}}>다른 결제수단은 추후 서비스될 예정입니다.</Text>

          <View style={{flexDirection: 'row', marginTop: 16}}>
            <CheckBox isChecked={this.state.cashReceiptBool} onClick={() => this.setState({cashReceiptBool: !this.state.cashReceiptBool})} uncheckedCheckBoxColor={'#888888'} checkedCheckBoxColor={'#ed6578'}></CheckBox>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.8, color: this.state.cashReceiptBool ? '#000000' : '#979797', marginLeft: 8}}>현금영수증 신청</Text>
          </View>

          {this.state.cashReceiptBool ?
            <View>
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity style={{width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => this.setState({cashReceiptPersonalBool: !this.state.cashReceiptPersonalBool, cashReceiptBusinessBool: false})}>
                    <View style={{width: 20, height: 20, borderRadius: 100, borderWidth: 2, borderColor: this.state.cashReceiptPersonalBool ? '#ed6578' : '#757575', alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: this.state.cashReceiptPersonalBool ? '#ed6578' : '#ffffff'}}></View>
                    </View>
                  </TouchableOpacity>

                  <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.8, color: '#333333', marginLeft: 8}}>개인소득공제용</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
                  <TouchableOpacity style={{width: 24, height: 24, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => this.setState({cashReceiptBusinessBool: !this.state.cashReceiptBusinessBool, cashReceiptPersonalBool: false})}>
                    <View style={{width: 20, height: 20, borderRadius: 100, borderWidth: 2, borderColor: this.state.cashReceiptBusinessBool ? '#ed6578' : '#757575', alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: this.state.cashReceiptBusinessBool ? '#ed6578' : '#ffffff'}}></View>
                    </View>
                  </TouchableOpacity>

                  <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.8, color: '#333333', marginLeft: 8}}>사업자증빙용</Text>
                </View>
              </View>

              <TextInput style={{width: '100%', aspectRatio: 304 / 32, borderWidth: 1, marginTop: 16, paddingHorizontal: 16, paddingVertical: 0}}
                          placeholder={'휴대전화 번호를 입력해주세요 (‘-‘ 제외)'}
                          placeholderTextColor={'#d2d2d2'}
                          maxLength={11}
                          keyboardType={'number-pad'}
                          onChangeText={(cashReceiptPhoneNum) => this.setState({cashReceiptPhoneNum})}></TextInput>
            </View>
            :
            <View style={{alignItems: 'center', marginTop: 32}}>
              <Text style={{width: '86.5%', fontFamily: 'Roboto-Medium', fontSize: 16, letterSpacing: -0.8, color: '#ff0000'}}>{`주의사항!\n\n주문 후 20분 내에 입금되지 않을 시 자동으로 주문이 취소됩니다.\n\n문의사항이 생길 시\n마이페이지 → 고객만족센터 →  카카오톡 플친으로 문의 주세요.`}</Text>
            </View>
          }

          {/* <Text>{JSON.stringify(this.state)}</Text> */}

        </ScrollView>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{width: '80%', aspectRatio: 288 / 44, borderRadius: 100, backgroundColor: '#ed6578', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 32}}
                            onPress={() => {
                              if (this.state.cashReceiptBool) {
                                if (!this.state.cashReceiptPersonalBool && !this.state.cashReceiptBusinessBool) {
                                  ToastAndroid.show('현금영수증의 용도를 선택해주세요.', ToastAndroid.SHORT);
                                  return;
                                }
                                
                                if (!this.state.cashReceiptPhoneNum) {
                                  ToastAndroid.show('휴대전화 번호를 입력해주세요.', ToastAndroid.SHORT);
                                  return;
                                }

                                // 현금영수증 발급하는 플로우 추가해야함.
                                // 여기에 추가하는 게 아니라, 표시만 해놨다가 입금이 완료되면 플로우가 실행되어야하지 않을까?
                              }

                              this.props.navigation.navigate('payment',
                              {
                                userEmail: this.state.userEmail,
                                timeSelect: this.state.timeSelect,
                                paymentMethod: this.state.paymentMethod,
                                deliv_date: this.state.deliv_date,
                              });
                            }}>
            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, letterSpacing: -1.2, color: '#ffffff'}}>{this.numberWithCommas(this.state.totalPrice)}원 결제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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