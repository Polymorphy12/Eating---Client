import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {Header, Left, Right, Title} from 'native-base';
import axios from 'axios';
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import SelectRestaurantClock from '../Component/selectRestaurantClock';
import { SafeAreaView } from "react-navigation";

export default class SelectRestaurant extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      progress: 1, 
      pageTitle: "주문하기", 
      lunchRestList: [],
      dinnerRestList: [],
      timeSelect: 'lunch',

      // 현재는 자동로그인 개발 도중이라 로그인 플로우가 불안정하다, 임시로 디폴트 계정을 넣어놓은 것이니 나중에 수정하자.
      // userEmail : props.navigation.getParam('userEmail'),
      userEmail : props.navigation.getParam('userEmail', 'Klad'),
    };
    //console.log(this.state.restaurant_name);
    
  }
    
  componentDidMount() {
    axios.get('http://13.124.193.165:3000/restaurants')
      .then(response => {
        for(let i = 0; i < response.data.length; i++) {
          if (response.data[i].lunch)   this.state.lunchRestList = this.state.lunchRestList.concat(response.data[i])
          if (response.data[i].dinner)  this.state.dinnerRestList = this.state.dinnerRestList.concat(response.data[i])
        }

        this.setState({reloadFlag: 0});
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });

    
  }    

  _renderItem = ({item}) => (
    <TouchableOpacity style = {{flexDirection: 'row', alignItems: 'center'}} 
                      onPress={() => {
                        this.props.navigation.navigate("menu", {userEmail: this.state.userEmail, restaurant_name : item.restaurant_name, timeSelect: this.state.timeSelect});
                        console.log(this.props);
                      }} >
      <Image style={{width: 72, height : 80, marginRight : 49}}
        source={{uri: 'http://13.124.193.165:3000/static/' + item.restaurant_image}}
        resizeMode={'contain'}
        >
      </Image>
      <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 14, letterSpacing: -0.7, color: '#000000'}}>{item.restaurant_name}</Text>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.6, color: '#ff2d3f'}}>자리 남음!</Text>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, letterSpacing: -0.45, color: '#7f7f7f'}}>인기메뉴 / 대표메뉴</Text>
      </View>
    </TouchableOpacity>
  );

      render() {

        const {navigation } = this.props;

        console.log("render!!!");
        console.log(this.props);

        return (
          <View style={{flex: 1}}>
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.userEmail}></OrderHeader>
            

            <View style = {orderDueContainer}>
              <View style={toggleContainer}>
                <TouchableOpacity style={{width: '50%', aspectRatio: 164 / 32, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'lunch' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                  disabled={this.state.timeSelect === 'lunch'}
                                  onPress={() => this.setState({timeSelect: 'lunch'})}>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'lunch' ? '#ed6578' : '#000000'}}>점심</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width: '50%', aspectRatio: 164 / 32, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'dinner' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                  disabled={this.state.timeSelect === 'dinner'}
                                  onPress={() => this.setState({timeSelect: 'dinner'})}>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'dinner' ? '#ed6578' : '#000000'}}>저녁</Text>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <SelectRestaurantClock style={{height: 20, alignItems: 'center', justifyContent: 'center', marginVertical: 32}} timeSelect={this.state.timeSelect}></SelectRestaurantClock>
              </View>

              <FlatList 
                data={this.state.timeSelect === 'lunch' ? this.state.lunchRestList : this.state.dinnerRestList}
                renderItem={this._renderItem}
                keyExtractor={item => String(item.id)}
                numColumns={1}
              />

            </View>
            
            <MyFooter navigation={this.props.navigation} orderBoolean={true} userEmail={this.state.userEmail}></MyFooter>
          </View>
        );
      }
}

const toggleContainer = {
  marginTop: 20,
  flexDirection: 'row',
  alignItems: 'center'
}

const orderDueContainer = {
  flex: 1,
  marginHorizontal: 16,
}