import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';

export default class LocationSet extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: "수령 장소",
      username : props.navigation.getParam('username', ''),
      itemPressed : '0'
    }
  } 
  

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/location',{
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

  typeSelected(value) {
    this.setState({
        itemPressed: value
    });
  }
    
      _renderItem = ({item}) => (
        <TouchableOpacity style = {{marginHorizontal : '3.9%', marginVertical: '3.7%', borderWidth : 1, borderColor: this.state.itemPressed === item.location ? 'red' : '#000000', borderStyle: "solid", borderRadius: 20, flexDirection: 'column'}}
                          onPress={() => {
                            this.typeSelected(item.location)
                          }}>
          <View style={{marginHorizontal: '4.7%'}}>
            <View style={{borderBottomWidth: 2, borderBottomColor: '#686868'}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, lineHeight: 22, letterSpacing: -0.2, color: '#000000', marginVertical: '2%'}}>{item.location}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: '10%', marginBottom: '5%', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{ 
                  width: 80, 
                  height : 86,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#979797"
                  }}
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.location_image}}
                  > 
                </Image>
                <Image style={{ 
                  width: 80, 
                  height : 86,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#979797",
                  marginLeft: '4.7%'
                  }}
                  source={{uri: 'http://13.124.193.165:3000/static/' + item.location_map}}> 
                </Image>
              </View>
              <View style={{height: 86, justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, lineHeight: 22, letterSpacing: -0.21, color: '#686868'}}>점심  </Text>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, lineHeight: 22, letterSpacing: -0.21, color: '#000000'}}>11:50</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, lineHeight: 22, letterSpacing: -0.21, color: '#686868'}}>저녁  </Text>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 15, lineHeight: 22, letterSpacing: -0.21, color: '#000000'}}>17:50</Text>
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
            username={this.state.username}></OrderHeader>
            
            <ShoppingCartProgressBar progress={1}></ShoppingCartProgressBar>
            
            <View style = {{height: '63.9%', marginHorizontal : '3.9%', paddingTop: "3.478%", borderWidth : 1, borderStyle: "solid", borderRadius: 4}}>
              <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 17, lineHeight: 22, letterSpacing: -0.24, color: '#000000', marginHorizontal: '3.9%'}}>배달장소</Text>
              <FlatList 
                data={this.state.data}
                renderItem={this._renderItem}
                extraData={this.state}
                contentContainerStyle={listView}
              />
            </View>
            
            <View style={orderButtonContainer}>
                <TouchableOpacity
                    style={orderButton}
                    title="first"
                    onPress={() => {
                      if(this.state.itemPressed == '0') {
                        Alert.alert('','수령할 장소를 선택해주세요.')
                        return;
                      };
                      axios.put('http://13.124.193.165:3000/location',{
                          username : this.state.username,
                          purchase_location : this.state.itemPressed
                          
                        })
                        .then(response => {
                          navigation.navigate("purchase", {username : this.state.username});
                        })
                        .catch(function(error) {
                          console.log('There has been a problem with your fetch operation: ' + error.message);
                        // ADD THIS THROW error
                        throw error;
                      });
                        
                    }}
                  >
                  <Text style={letsGetStarted}>결제 수단 선택</Text>
                </TouchableOpacity>
            </View>
        
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