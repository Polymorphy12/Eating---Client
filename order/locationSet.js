import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';

export default class LocationSet extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: "배달 주문하기",
      userEmail : props.navigation.getParam('userEmail', ''),
      timeSelect : props.navigation.getParam('timeSelect'),
      deliv_date: props.navigation.getParam('deliv_date'),
      itemPressed : '0'
    }
  } 
  

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/location',{
        params: {
          userEmail : this.state.userEmail
        }
    })
    .then(response => {
      this.setState({data : response.data});
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    // ADD THIS THROW error
      throw error;
    });
  
  }

  typeSelected(value) {
    this.setState({
        itemPressed: value
    });
  }
    
      _renderItem = ({item}) => (
        <TouchableOpacity style = {{marginHorizontal : 16, marginTop: 24, borderWidth : 1, borderColor: this.state.itemPressed === item.location ? '#ed6578' : '#000000', borderStyle: "solid", borderRadius: 20, flexDirection: 'column'}}
                          onPress={() => {
                            this.typeSelected(item.location)
                          }}>
          <View style={{marginHorizontal: 16}}>
            <View>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, lineHeight: 22, letterSpacing: -0.23, color: '#000000', marginVertical: 16}}>{item.location}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 80, height : 86, borderWidth: 1, borderColor: "#979797"}}
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.location_image}}
                  > 
                </Image>
                <Image style={{width: 80, height : 86, borderWidth: 1, borderColor: "#979797", marginLeft: '4.7%' }}
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.location_map}}> 
                </Image>
              </View>
              <View style={{justifyContent: 'space-between', paddingRight: 16}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#686868'}}>배달일시</Text>
                <View>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#000000'}}>{this.state.deliv_date.substr(6)}</Text>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#000000'}}>{this.state.timeSelect === 'lunch' ? `12:00 PM` : '06:00 PM'}</Text>
                </View>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      );


      render() {

        const {navigation } = this.props;

        return (
          <View
            style= {{flex: 1}}>
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.userEmail}></OrderHeader>
            
            <ShoppingCartProgressBar progress={1}></ShoppingCartProgressBar>
            
            <ScrollView style = {{marginHorizontal : 16, marginTop: 8, borderWidth : 1, borderRadius: 5}}>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000', marginHorizontal: 16, marginTop: 16}}>배달장소</Text>
              <FlatList 
                data={this.state.data}
                renderItem={this._renderItem}
                extraData={this.state}
                contentContainerStyle={{marginBottom: 16}}/>

              {/* <Text>{JSON.stringify(this.state.itemPressed)}</Text> */}
              {/* <Text>{JSON.stringify(this.state.userEmail)}</Text> */}
            </ScrollView>
            
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={{width: '80%', aspectRatio: 288 / 44, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.itemPressed === '0' ? '#dddddd' : "#ed6578", marginVertical: 32}}
                    title="first"
                    onPress={() => {
                      if(this.state.itemPressed == '0') {
                        Alert.alert('','수령할 장소를 선택해주세요.')
                        return;
                      };
                      axios.put('http://13.124.193.165:3000/location',{
                          userEmail : this.state.userEmail,
                          purchase_location : this.state.itemPressed,
                          timeSelect: this.state.timeSelect,                          
                        })
                        .then(response => {
                          //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                          navigation.navigate("purchase", {userEmail : this.state.userEmail, timeSelect : this.state.timeSelect, deliv_date: this.state.deliv_date});
                        })
                        .catch(function(error) {
                          console.log('There has been a problem with your fetch operation: ' + error.message);
                          // ADD THIS THROW error
                          throw error;
                      });
                    }}
                  >
                  <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, letterSpacing: -1.2, color: '#ffffff'}}>결제 수단 선택하기</Text>
                </TouchableOpacity>
            </View>
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
  borderWidth: 0,
  borderColor: "#ed6578",
  flexDirection: 'row',
  alignItems: 'center'
};

const backgroundPressed = {
  height: 160,
  borderRadius: 4,
  backgroundColor: '#fff',
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#ed6578",
  flexDirection: 'row',
  alignItems: 'center'
};

const listView = {
//   // flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
}

const locationInfoContainer = {
  margin: 35,
  justifyContent: 'space-evenly',
  backgroundColor: 'red',
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
    width: '100%',
    height: 44,
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