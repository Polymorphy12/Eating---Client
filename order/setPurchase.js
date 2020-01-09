import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class SetPurchase extends Component {
    state = {
        data: [1, 2, 3, 4, 5, 6,7,8]
      }
    
      _renderItem = ({item}) => (
        <TouchableOpacity style = {background}>
            <Image style={{ 
              width: 80, 
              height : 86,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "#979797"
              }}> 
            </Image>
            <View style = {locationInfoContainer}>
                <Text style={locationName}>배달 장소</Text>
                <Text style={receivingTime}>점심수령시간: 11:50</Text>
            </View>
        </TouchableOpacity>
      );


      render() {
        const {navigation } = this.props;

        return (
          <View
            style= {{
              flex: 1              
            }}>
            <View style = {navBar}>
              <Text style={titleText}>결제 수단 선택</Text>
            </View>
            
            
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
                        navigation.navigate("purchase");
                    }}
                >
                    <Text style={letsGetStarted}>결제하기</Text>
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
  borderWidth: 1,
  borderColor: "#ff1d30",
  flexDirection: 'row',
  alignItems: 'center'
};

const listView = {
//   // flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
}

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
    backgroundColor: "#ff3345",
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