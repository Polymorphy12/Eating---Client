import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import axios from "axios";

export default class ShoppingCart extends Component {
    
  
  constructor(props) {
    super(props)
    this.state = { 
      progress: 1,
      pageTitle: "장바구니",
      lunchOrderList: [],
      dinnerOrderList: [],
      timeSelect : 'lunch',
      menu_name : props.navigation.getParam('menu_name', '더블치즈제육'),
      userEmail : props.navigation.getParam('userEmail', ''),
      amount : props.navigation.getParam('menu_amount', 0),
      reloadFlag: 0,
    }
  }
  
  componentDidMount(){
    axios.get('http://13.124.193.165:3000/cart',{
        params: {
          userEmail : this.state.userEmail,
        }
    })
    .then(response => {
      for(let i = 0; i < response.data.length; i++) {
        if (response.data[i].lunch) {
          // var tempLunchOrder = Object.assign({listID: lunchIndex++}, response.data[i]); <-- 오브젝트를 합치는 방법을 기록해 놓기 위해 주석으로 남겨둔 코드.
          this.setState({lunchOrderList: this.state.lunchOrderList.concat(response.data[i])});
        }
        if (response.data[i].dinner) {
          // var tempDinnerOrder = Object.assign({listID: dinnerIndex++}, response.data[i]);
          this.setState({dinnerOrderList: this.state.dinnerOrderList.concat(response.data[i])});
        }
      }
      //ToastAndroid.show(response.data, ToastAndroid.SHORT);
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  renderMenu = ({item}) => (
    <View style={{marginHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eeeeee', paddingVertical: 16}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 18, letterSpacing: -0.9, color: '#6e6e6e'}}>{item.menu_name}</Text>
        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -1, color: '#000000'}}>{this.numberWithCommas(item.menu_price * item.amount)} 원</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => {
                              let a = this.state.timeSelect === 'lunch' ? this.state.lunchOrderList.findIndex(elem => elem.id === item.id) : this.state.dinnerOrderList.findIndex(elem => elem.id === item.id);
                              this.state.timeSelect === 'lunch' ? this.state.lunchOrderList.splice(a, 1) : this.state.dinnerOrderList.splice(a, 1);
                              this.setState({reloadFlag: this.state.reloadFlag});

                              axios.post('http://13.124.193.165:3000/cart/cancelMenu', {
                                params: {
                                  id: item.id
                                }
                              }).then(response => {
                                ToastAndroid.show(response.data, ToastAndroid.SHORT);
                              }).catch(error => {
                                console.log('There has been a problem with your fetch operation: ' + error.message);
                                // ADD THIS THROW error
                                throw error;
                              });
                            }}>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.8, color: '#ff7f7f'}}>메뉴 제외하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {
                              if (item.amount > 1)  item.amount -= 1;
                              this.setState({reloadFlag: this.state.reloadFlag});
                            }}>
            <Image style={{width: 32, height: 32}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_빼기.png')}></Image>
          </TouchableOpacity>

          <View style={{width: 94, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: 1.57, color: '#000000'}}>{item.amount}</Text>
          </View>

          <TouchableOpacity onPress={() => {
                              item.amount += 1;
                              this.setState({reloadFlag: this.state.reloadFlag});
                            }}>
            <Image style={{width: 32, height: 32}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_더하기.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  renderRestTotalPrice = ({item}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 32, marginRight: 16}}>
      <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 18, letterSpacing: -0.9, color: '#6e6e6e'}}>{item.restaurant_name}</Text>
      <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 18, letterSpacing: -0.9, color: '#333333'}}>{this.numberWithCommas(item.total_price)} 원</Text>
    </View>
  );


  render() {
    var lunchTotalPrice = 0, dinnerTotalPrice = 0;
    var lunchRestTotalPrice = [], dinnerRestTotalPrice = [];
    for (let i = 0; i < this.state.lunchOrderList.length; i++) {
      let index = lunchRestTotalPrice.findIndex(elem => elem.restaurant_name === this.state.lunchOrderList[i].restaurant_name);
      let totalMenuPrice = (this.state.lunchOrderList[i].menu_price * this.state.lunchOrderList[i].amount);
      lunchTotalPrice += totalMenuPrice;
      if (index === -1) {
        let tempObj = {restaurant_name: this.state.lunchOrderList[i].restaurant_name, total_price: totalMenuPrice};
        lunchRestTotalPrice = lunchRestTotalPrice.concat(tempObj);
      }
      else {
        lunchRestTotalPrice[index].total_price += totalMenuPrice;
      }
    }

    for (let i = 0; i < this.state.dinnerOrderList.length; i++) {
      let index = dinnerRestTotalPrice.findIndex(elem => elem.restaurant_name === this.state.dinnerOrderList[i].restaurant_name);
      let totalMenuPrice = (this.state.dinnerOrderList[i].menu_price * this.state.dinnerOrderList[i].amount);
      dinnerTotalPrice += totalMenuPrice;
      if (index === -1) {
        let tempObj = {restaurant_name: this.state.dinnerOrderList[i].restaurant_name, total_price: totalMenuPrice};
        dinnerRestTotalPrice = dinnerRestTotalPrice.concat(tempObj);
      }
      else {
        dinnerRestTotalPrice[index].total_price += totalMenuPrice;
      }
    }

    return (
      <View style={{flex: 1}}>
        <OrderHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle} username={this.state.userEmail}></OrderHeader>
        <ShoppingCartProgressBar progress={0}></ShoppingCartProgressBar>

        <ScrollView style={{borderWidth: 1, borderRadius: 5, marginHorizontal: 16, marginTop: 8}}>
          <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000', margin: 16}}>주문 목록</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{width: '50%', height: 40, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'lunch' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                              disabled={this.state.timeSelect === 'lunch'}
                              onPress={() => this.setState({timeSelect: 'lunch'})}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'lunch' ? '#ed6578' : '#000000'}}>점심</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '50%', height: 40, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'dinner' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                              disabled={this.state.timeSelect === 'dinner'}
                              onPress={() => this.setState({timeSelect: 'dinner'})}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'dinner' ? '#ed6578' : '#000000'}}>저녁</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={this.state.timeSelect === 'lunch' ? this.state.lunchOrderList : this.state.dinnerOrderList} renderItem={this.renderMenu} keyExtractor={item => String(item.id)}/>
        
          <View style={{height: 8, top: -1, backgroundColor: '#eeeeee'}}></View>
          <Text style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 20, letterSpacing: -1, color: '#000000', margin: 16}}>합계</Text>

          <FlatList data={this.state.timeSelect === 'lunch' ? lunchRestTotalPrice : dinnerRestTotalPrice} renderItem={this.renderRestTotalPrice} keyExtractor={item => String(item.restaurant_name)}/>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 32, marginRight: 16, marginVertical: 32}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 18, letterSpacing: -0.9, color: '#6e6e6e'}}>총 결제 금액</Text>
            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 22, letterSpacing: -1.1, color: '#ed6578'}}>{this.numberWithCommas(this.state.timeSelect === 'lunch' ? lunchTotalPrice : dinnerTotalPrice)} 원</Text>
          </View>

          {/* <Text>{JSON.stringify(this.state.timeSelect === 'lunch' ? this.state.lunchOrderList : this.state.dinnerOrderList)}</Text> */}
        
        </ScrollView>

        <View style={{alignItems: 'center', marginVertical: 32}}>
          <TouchableOpacity style={{width: '80%', height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 100,
                                    backgroundColor: this.state.timeSelect === 'lunch' ? (this.state.lunchOrderList.length === 0 ? '#dddddd' : '#ed6578') : (this.state.dinnerOrderList.length === 0 ? '#dddddd' : '#ed6578')}}
                            disabled={this.state.timeSelect === 'lunch' ?
                                      (this.state.lunchOrderList.length === 0 ? true : false) :
                                      (this.state.dinnerOrderList.length === 0 ? true : false)
                                    }
                            onPress={() => {
                              // 이 onPress 함수는 주문내역의 변경이 있건 없건 주문 목록을 업데이트하도록 구현되어있다. 서버에 불필요한 부하를 주지 않을까? 개선할 방법을 차차 생각해보자.
                              var menusToUpdate = [];
                              var menusToUpdateTarget = this.state.timeSelect === 'lunch' ? this.state.lunchOrderList : this.state.dinnerOrderList;
                              for (let i = 0; i < menusToUpdateTarget.length; i++) {
                                var tempObj = {id: menusToUpdateTarget[i].id, amount: menusToUpdateTarget[i].amount};
                                menusToUpdate = menusToUpdate.concat(tempObj);
                              }
                              axios.post('http://13.124.193.165:3000/cart/updateShoppingCart', {
                                params: {
                                  menusToUpdate: menusToUpdate,
                                }
                              }).then(response => {
                                //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                if (response.data === true) this.props.navigation.navigate("locationSet", {userEmail : this.state.userEmail, timeSelect : this.state.timeSelect});
                                else ToastAndroid.show('시스템에 문제가 생겼습니다. 고객센터에 문의해 주세요.', ToastAndroid.SHORT);
                              }).catch(error => {
                                console.log('There has been a problem with your fetch operation: ' + error.message);
                                // ADD THIS THROW error
                                throw error;
                              });
                            }}>
            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, letterSpacing: -1.2, color: '#ffffff'}}>수령 장소 고르기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}