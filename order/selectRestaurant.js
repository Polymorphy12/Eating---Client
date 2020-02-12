import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {Header, Left, Right, Title} from 'native-base';
import axios from 'axios';
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import { SafeAreaView } from "react-navigation";

export default class SelectRestaurant extends Component {


  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      pageTitle: "업체 선택", 
      lunchRestList: [],
      dinnerRestList: [],
      timeSelect: 'lunch',
      userEmail : props.navigation.getParam('userEmail', '')
    }
    //console.log(this.state.restaurant_name);
  }
    
  componentDidMount() {
    axios.get('http://13.124.193.165:3000/restaurants', {
      params: {
        timeSelect : this.state.timeSelect,
      }
    })
      .then(response => {
        for(let i = 0; i < response.data.length; i++) {
          if (response.data[i].lunch)   this.setState({lunchRestList: this.state.lunchRestList.concat(response.data[i])})
          if (response.data[i].dinner)  this.setState({dinnerRestList: this.state.dinnerRestList.concat(response.data[i])})
        }
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

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {orderDue}>{this.state.timeSelect === 'lunch' ? `점심 주문 마감 시간: 09:30 AM` : `저녁 주문 마감 시간: 03:30 PM`}</Text>
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

const restaurantTitle = {
  fontFamily: "S-CoreDream-4",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0.91,
  textAlign: "left",
  color: "#000000"
};

const orderAvailable = {
  fontFamily: "S-CoreDream-4",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0.78,
  textAlign: "left",
  color: "#ff2d3f"
};

const popularMenu = {
  fontFamily: "S-CoreDream-4",
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 10,
  letterSpacing: 0.59,
  textAlign: "left",
  color: "rgba(0, 0, 0, 0.5)"
};

const titleText = {
  // width: 225.6,
  // height: 25,
  flex:1,
  fontFamily: "AppleSDGothicNeo",
  fontSize: 23,
  fontWeight: "800",
  fontStyle: "normal",
  // lineHeight: 25,
  letterSpacing: -0.24,
  textAlign: "center",
  color: "#000"
};

const toggleContainer = {
  marginTop: 20,
  flexDirection: 'row',
  alignItems: 'center'
}

const orderDueContainer = {
  flex: 1,
  marginHorizontal: 16,
}

const orderDue = {
  marginTop: 30,
  marginBottom: 32,
  fontFamily: "S-CoreDream-4Regular",
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: -0.9,
  color: "#000000"
}

const background = {
  flexDirection: 'row',
  width: '100%',
  height: 84,
  borderRadius: 4,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  marginHorizontal: 16,
};

const listView = {
  // flex: 1,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center'
}

const navBar = {
  height: 70,
  //opacity: 0.51,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: 'row',
  backgroundColor: "#ffffff",
  borderBottomWidth: 0, 
  //shadowOffset: {height: 0, width: 0}, 
  //shadowOpacity: 0, 
  elevation: 0
};


const footer ={
  height: 80,
  backgroundColor: "rgba(248, 248, 248, 0.98)",
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center"
}

const footerBox ={
  margin: 20,
  justifyContent: "center",
  alignItems: "center",
  width: 89.3,
  height: 40,
  backgroundColor: "rgba(185, 202, 210, 0)"
}