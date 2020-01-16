import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import axios from "axios";
import MyFooter from "../Component/MyFooter";

export default class Menu extends Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      empty: false, 
      buttonColor: "#fadee2", 
      pageTitle: "주문하기", 
      restaurant_name: props.navigation.getParam('restaurant_name', '봉구스밥버거'),
      username : props.navigation.getParam('username', '')
    }
    //console.log(this.state.restaurant_name);
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
      componentDidMount(){
        //console.log('SelectRestaurant componentDidMount!!');
        
        axios.get('http://13.124.193.165:3000/menus',{
              params: {
                  restaurant_name : this.state.restaurant_name
              }
          })
          .then(response => {
            //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
            this.setState({data : response.data});
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
           throw error;
         });
      }
    
      _renderItem = ({item}) => {
        if(item.menu_image)
        {
          return(
            <View style = {{flexDirection: 'row', marginHorizontal: '6.7%', justifyContent: 'space-between', paddingBottom: '2%'}}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{ 
                  width: 68, 
                  height : 68}}              
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.menu_image}}></Image>
                <View style = {{marginLeft: '8.9%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <Text style={foodName}>{item.menu_name}</Text>
                  <Text style={foodPrice}>{this.numberWithCommas(item.menu_price)}</Text>
                </View>
              </View>

              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity style = {{width: 138, height: 36, borderRadius: 32, backgroundColor: '#ed6578', 
                                            alignItems: 'center', justifyContent: "center"}}
                                  onPress={() => {
                                    this.props.navigation.navigate("menuDetails", 
                                    {username: this.state.username, restaurant_name : this.state.restaurant_name, menu_image : item.menu_image, 
                                      menu_price : item.menu_price, menu_name : item.menu_name});
                                    console.log(this.props);
                                  }}>
                  <Text style = {{fontFamily: "S-CoreDream-8Heavy", fontSize: 14, fontWeight: "900", fontStyle: "normal", letterSpacing: 0.65, textAlign: "center", color: "#ffffff"}}>
                    장바구니에 담기</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        else{
          return(
            <View style = {{flexDirection: 'row', marginHorizontal: '6.7%', justifyContent: 'space-between', paddingBottom: '2%'}}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{ 
                  width: 68, 
                  height : 68}}              
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.menu_image}}></Image>
                <View style = {{marginLeft: '8.9%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <Text style={foodName}>{item.menu_name}</Text>
                  <Text style={foodPrice}>{this.numberWithCommas(item.menu_price)}</Text>
                </View>
              </View>

              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity style = {{width: 138, height: 36, borderRadius: 32, backgroundColor: '#ed6578', 
                                            alignItems: 'center', justifyContent: "center"}}
                                  onPress={() => {
                                    this.props.navigation.navigate("menuDetails", 
                                    {username: this.state.username, restaurant_name : this.state.restaurant_name, menu_image : item.menu_image, 
                                      menu_price : item.menu_price, menu_name : item.menu_name});
                                    console.log(this.props);
                                  }}>
                  <Text style = {{fontFamily: "S-CoreDream-8Heavy", fontSize: 14, fontWeight: "900", fontStyle: "normal", letterSpacing: 0.65, textAlign: "center", color: "#ffffff"}}>
                    장바구니에 담기</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
          
    }

      handleIncrease = () => {
        this.setState({
          data: this.state.data.concat( this.state.data.length + 1 )
        });
      }

      render() {

        return (
          <View
            style= {{flex: 1}}>
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.username}></OrderHeader>
            
            <Text style={titleText}>{this.state.restaurant_name}</Text>
            
            <FlatList 
              data={this.state.data}
              renderItem={this._renderItem}
              contentContainerStyle={listView}/>

            <MyFooter navigation={this.props.navigation} orderBoolean={true}></MyFooter>
          </View>
        );
      }
}

const titleText = {
  // width: 225.6,
  // height: 25,
  fontFamily: "S-CoreDream-5Medium",
  fontSize: 20,
  fontWeight: "800",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 1.31,
  textAlign: "center",
  color: "#6e6e6e",
  marginVertical: '2.5%',
};


const background = {
  height: 80,
  borderRadius: 4,
  borderStyle: "solid",
  borderWidth: 0,
  borderColor: "#ff1d30",
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
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
  
  fontFamily: "S-CoreDream-5Medium",
  fontSize: 17,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#273951",
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
//   backgroundColor: "#ff1d30"
  backgroundColor: "#ffffff"
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