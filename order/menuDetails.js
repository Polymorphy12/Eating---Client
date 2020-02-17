import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";

export default class MenuDetails extends Component {
    
  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      empty: false, 
      buttonColor: "#fadee2", 
      pageTitle: props.navigation.getParam('restaurant_name', '봉구스밥버거'), 
      userEmail : props.navigation.getParam('userEmail', ""),
      restaurant_name: props.navigation.getParam('restaurant_name', '봉구스밥버거'),
      timeSelect: props.navigation.getParam('timeSelect'),
      menuImage : props.navigation.getParam('menuImage', ""),
      menuName : props.navigation.getParam('menuName', '더블치즈제육'),
      menuPrice : props.navigation.getParam('menuPrice', 2500),
      menuAmount : 1,
      totalPrice : props.navigation.getParam('menuPrice', 2500),
    }

    console.log(this.state.restaurant_name);
    
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  handleIncrease = () => {
    this.setState({
      menuAmount : this.state.menuAmount + 1,
      totalPrice : this.state.menuPrice * (this.state.menuAmount+1)
    });
  }

  handleDecrease = () => {
    if(this.state.menuAmount > 1)
    {
      this.setState({
        menuAmount : this.state.menuAmount - 1,
        totalPrice : this.state.menuPrice * (this.state.menuAmount-1)
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <OrderHeader 
        navigation={this.props.navigation} 
        pageTitle={this.state.pageTitle}
        username={this.state.userEmail}></OrderHeader>

        <View style={{marginHorizontal: 16}}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 40}}>
            <Image style={{width: 108, height: 108}}
                    source={{uri: 'http://13.124.193.165:3000/static/' + this.state.menuImage}}></Image>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -1, color: '#000000'}}>{this.state.menuName}</Text>

          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#d5d5d5', paddingBottom: 24}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -1, color: '#000000'}}>가격</Text>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -1, color: '#000000'}}>{this.numberWithCommas(this.state.totalPrice)} 원</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#d5d5d5', paddingVertical: 32}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -1, color: '#000000'}}>수량</Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.handleDecrease}>
                <Image style={{width: 40, height: 40}}
                        source={require('../assets/images/drawable-xxxhdpi/아이콘_빼기.png')}></Image>
              </TouchableOpacity>

              <View style={{width: 94, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: 1.57, color: '#000000'}}>{this.state.menuAmount}</Text>
              </View>

              <TouchableOpacity onPress={this.handleIncrease}>
                <Image style={{width: 40, height: 40}}
                        source={require('../assets/images/drawable-xxxhdpi/아이콘_더하기.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 28}}>
            <TouchableOpacity style={{width: '49%', height: 50, borderWidth: 1, borderColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
                              onPress={() => {
                                axios.post('http://13.124.193.165:3000/cart',{
                                  params: {
                                    userEmail : this.state.userEmail,
                                    menu_name : this.state.menuName,
                                    amount : this.state.menuAmount,
                                    timeSelect : this.state.timeSelect,
                                  }
                                })
                                .then(response => {
                                  //ToastAndroid.show(response.data, ToastAndroid.SHORT);
                                  this.props.navigation.navigate('shoppingCart', {userEmail: this.state.userEmail});
                                })
                                .catch(function(error) {
                                  console.log('There has been a problem with your fetch operation: ' + error.message);
                                  // ADD THIS THROW error
                                  throw error;
                                });}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, letterSpacing: -0.75, color: '#ed6578'}}>바로 구매하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '49%', height: 50, backgroundColor: '#ed6578', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
                              onPress={() => {
                                axios.post('http://13.124.193.165:3000/cart',{
                                  params: {
                                    userEmail : this.state.userEmail,
                                    menu_name : this.state.menuName,
                                    amount : this.state.menuAmount,
                                    timeSelect : this.state.timeSelect,
                                  }
                                })
                                .then(response => {
                                  ToastAndroid.show(response.data, ToastAndroid.SHORT);
                                })
                                .catch(function(error) {
                                  console.log('There has been a problem with your fetch operation: ' + error.message);
                                  // ADD THIS THROW error
                                  throw error;
                                });}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, letterSpacing: -0.75, color: '#ffffff'}}>장바구니에 담기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MyFooter navigation={this.props.navigation} orderBoolean={true} userEmail={this.state.userEmail}></MyFooter>
      </View>
    );
  }
}