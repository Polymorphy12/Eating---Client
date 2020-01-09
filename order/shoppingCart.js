import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import axios from "axios";

export default class ShoppingCart extends Component {
    
  
  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      empty: false, 
      mainColor: "#ed6578", 
      pageTitle: "장바구니",
      data: [],
      menu_name : props.navigation.getParam('menu_name', '더블치즈제육'),
      username : props.navigation.getParam('username', ''),
      amount : props.navigation.getParam('menu_amount', 0),
      is_get : props.navigation.getParam('is_get', false)
    }
  }
  
  componentDidMount(){
    if(!this.state.is_get)
    {
      axios.post('http://13.124.193.165:3000/cart',{
              params: {
                username : this.state.username,
                menu_name : this.state.menu_name,
                amount : this.state.amount
              }
          })
          .then(response => {
            ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
            this.setState({data : response.data});
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
           throw error;
         });
    }
    else{
      axios.get('http://13.124.193.165:3000/cart',{
          params: {
            username : this.state.username
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
    
  }

    
      _renderItem = ({item}) => (
        <TouchableOpacity style = {background}>
            <Image style={{ 
              width: 80, 
              height : 86,
              borderStyle: "solid",
              borderWidth: 0,
              borderColor: "#979797"
              }}
              source={{uri: 'http://13.124.193.165:3000/static/' + item.menu_image}}
              > 
            </Image>
            <View style = {foodInfoContainer}>
                <Text style={foodName}>{item.menu_name}, {item.amount}개</Text>
                <Text style={foodPrice}>{item.menu_price * item.amount}원</Text>
            </View>
        </TouchableOpacity>
      );


      render() {

        const {navigation } = this.props;

        return (
          <View
            style= {{
              flex: 1              
            }}
          >
            <OrderHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></OrderHeader>
            
            <FlatList 
              data={this.state.data}
              renderItem={this._renderItem}
              
              contentContainerStyle={listView}
            />
            
            <View style={orderButtonContainer}>
                <TouchableOpacity
                    style={orderButton}
                    title="first"
                    onPress={() => {
                        navigation.navigate("locationSet", {username : this.state.username});
                    }}
                >
                    <Text style={letsGetStarted}>장소 고르기</Text>
                </TouchableOpacity>
            </View>
            <MyFooter navigation={this.props.navigation}></MyFooter>
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
  borderColor: "#ff1d30",
  flexDirection: 'row',
  alignItems: 'center'
};

const listView = {
//   // flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
}

const foodInfoContainer = {
    margin: 35
}

const foodName = {
  
  fontFamily: "S-CoreDream-5",
  fontSize: 17,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#273951"
}

const foodPrice = {
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