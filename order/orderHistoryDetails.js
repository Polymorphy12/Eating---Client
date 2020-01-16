import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyFooter from "../Component/MyFooter";
import { SafeAreaView } from "react-navigation";

export default class OrderHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuPrice : 2500,
      menuAmount : 1,
      totalPrice : 2500,
      data: [1, 2,3,4,5,6,7,8,9],
    };
  }

  _renderItem = ({item}) => 
    <View style={{marginTop: '1.7%', flexDirection: 'row'}}>
      <Image style={{
            width: 80, 
            height : 80}}
            source={require('../assets/images/drawable-hdpi/메뉴_햄치즈밥버거.png')}></Image>
      <View style={{marginLeft: '7.2%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 12, lineHeight: 15, letterSpacing: 0.47, color: '#000000'}}>햄치즈밥버거</Text>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.35, color: '#000000'}}>₩ 3,500</Text>
      </View>
    </View>

  render() {
    return (
      <View style= {{flex: 1}}>
        <View style={{marginHorizontal: '5.9%', marginTop: '5.4%'}}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#eeeeee'}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, lineHeight: 19, letterSpacing: 0.19, color: '#000000'}}>봉구스밥버거</Text>
            <View style={{flexDirection: 'row', marginVertical: '2.1%'}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e'}}>결제 시간</Text>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e', marginLeft: '11.8%'}}>2019.09.14  20:43:06</Text>
            </View>
          </View>

          <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e', marginTop: '3.3%', marginBottom: '1.7%'}}>주문 내역</Text>
          
          <View style={{height: '75%'}}>
            <FlatList 
              data={this.state.data}
              renderItem={this._renderItem}
              contentContainerStyle={listView}/>

          </View>

          <SafeAreaView style={{borderTopWidth: 1, borderTopColor: '#eeeeee'}}>
            <View style={{marginVertical: '3.3%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e'}}>결제 금액</Text>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#000000'}}>₩ 3,500</Text>
            </View>
          </SafeAreaView>

          <SafeAreaView style={{borderTopWidth: 1, borderTopColor: '#eeeeee'}}>
            <View style={{marginVertical: '3.3%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e'}}>결제 수단</Text>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#000000'}}>무통장입금</Text>
            </View>
          </SafeAreaView>
          
        </View>
      </View>
    );
  }
}

const listView = {
  marginBottom: '4.2%',
}