import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {Header, Left, Right, Title} from 'native-base';
import axios from 'axios';
import OrderHeader from "../Component/OrderHeader";

export default class SelectRestaurant extends Component {


  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      empty: false, 
      buttonColor: "#fadee2", 
      pageTitle: "업체 선택", 
      data: [1, 2, 3, 4, 5, 6,7,8],
      username : props.navigation.getParam('username', '')
    }
    //console.log(this.state.restaurant_name);
    
  }
    
      componentDidMount(){
        console.log('SelectRestaurant componentDidMount!!');
        axios.get('http://13.124.193.165:3000/restaurants')
          .then(response => {
            this.setState({data : response.data});
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
           throw error;
         });
      }

      _renderItem = ({item}) => (
        <TouchableOpacity style = {background} 
        onPress={() => {
          this.props.navigation.navigate("menu", {username: this.state.username,restaurant_name : item.restaurant_name});
          console.log(this.props);
        }} >
            <Image style={{width: 84, height : 84, marginRight : 49}}
              source={{uri: 'http://13.124.193.165:3000/static/' + item.restaurant_image}}
              >
            </Image>
            <View>
              <Text style = {restaurantTitle}>{item.restaurant_name}</Text>
              <Text style = {orderAvailable}>자리 남음!</Text>
              <Text style = {popularMenu}>인기메뉴 / 대표메뉴</Text>
            </View>
        </TouchableOpacity>
      );

      handleIncrease = () => {
        this.setState({
          data: this.state.data.concat( this.state.data.length + 1 )
        });
      }

      handleDecrease = () => {
        this.setState({
          data: this.state.data.splice( this.state.data.length + 1 )
        });
      }

      render() {

        const {navigation } = this.props;

        console.log("render!!!");
        console.log(this.props);

        return (
          <View
            style= {{
              flex: 1
            }}
          >
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.username}></OrderHeader>
            
            
            <View style = {orderDueContainer}>
                <View style={toggleContainer}>
                  <TouchableOpacity style={toggleLunch} onPress={this.handleIncrease}>
                    <Text>점심</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={toggleDinner} onPress={this.handleDecrease}>
                    <Text>저녁</Text>
                  </TouchableOpacity>
                </View>
              
                <Text style = {orderDue}>점심 주문 마감 시간: 10:30 AM</Text>            
            </View>
            
            <FlatList 
              data={this.state.data}
              renderItem={this._renderItem}
              
              numColumns={1}
              contentContainerStyle={listView}
            />
            <View style = {footer}>
              <TouchableOpacity style = {footerBox}>
                <Image
                style={{width:55, height:55}}
                source={require('../assets/images/drawable-hdpi/아이콘_주문하기_active.png')}
                >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style = {footerBox}
              onPress={() => {
                this.props.navigation.navigate("haktalNews");
                console.log(this.props);
              }}>
                <Image
                  style={{width:55, height:55}}
                  source={require('../assets/images/drawable-hdpi/아이콘_학탈소식_disabled.png')}>
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style = {footerBox}
              onPress={() => {
                this.props.navigation.navigate("mypage");
                console.log(this.props);
              }}>
              <Image
                style={{width:55, height:55}}
                source={require('../assets/images/drawable-hdpi/아이콘_마이학탈_disabled.png')}>
              </Image>
              </TouchableOpacity>
            </View>
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

const toggleLunch = {
  width: 80,
  height: 20,
  borderTopLeftRadius: 100,
  borderBottomLeftRadius: 100,
  backgroundColor: "#ff1d30",
  alignItems: "center",
  justifyContent: "center"
}

const toggleDinner = {
  width: 80,
  height: 20,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  backgroundColor: "#dcdcdc",
  alignItems: "center",
  justifyContent: "center"

}

const orderDueContainer = {
  alignItems: "center",
  justifyContent: "center"
}

const orderDue = {
  marginTop: 10,
  fontFamily: "S-CoreDream-5",
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 1.05,
  color: "#000"
}

const background = {
  flexDirection: 'row',
  width: 400,
  height: 84,
  borderRadius: 4,
  backgroundColor: '#fff',
  // borderStyle: "solid",
  borderWidth: 0,
  // borderColor: "#ff1d30",
  margin: 0.5,
  marginLeft: 28,
  // justifyContent: 'center',
  alignItems: 'center'
};

const listView = {
  // flex: 1,
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