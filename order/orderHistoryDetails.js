import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyFooter from "../Component/MyFooter";
import { SafeAreaView } from "react-navigation";
import axios from "axios";

export default class OrderHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: props.navigation.getParam('id', ''),
      sample_restaurant: props.navigation.getParam('sample_restaurant', ''),
      time: props.navigation.getParam('time'),
    };
  }

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/purchase_summary/getDetailOrderLog',{
        params: {
          id : this.state.id,
        }
    }).then(response => {
        //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.LONG);
        this.setState({
          data : response.data,
        });
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
  }

  datetimeParse = (x) => String(x).substring(0,19).replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$1.$2.$3  $4:$5:$6');
  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  _renderItem = ({item}) => 
    <View style={{marginTop: '1.7%', flexDirection: 'row'}}>
      <Image style={{
            width: 80, 
            height : 80}}
            source={{uri : 'http://13.124.193.165:3000/static/' + item.menu_image}}></Image>
      <View style={{marginLeft: '7.2%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 12, lineHeight: 15, letterSpacing: 0.47, color: '#000000'}}>{item.menu_name} x {item.amount}</Text>
        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.35, color: '#000000'}}>₩ {this.numberWithCommas(item.menu_price * item.amount)}</Text>
      </View>
    </View>

  render() {
    
    var totalPrice = 0;
    for(var i = 0; i < this.state.data.length; i++) {
      totalPrice += this.state.data[i].menu_price * this.state.data[i].amount;
    }

    return (
      <View style= {{flex: 1}}>
        {/*<Text>{JSON.stringify(this.state.data)}</Text>*/}
        <View style={{marginHorizontal: '5.9%', marginTop: '5.4%'}}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#eeeeee'}}>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, lineHeight: 19, letterSpacing: 0.19, color: '#000000'}}>{this.state.sample_restaurant}</Text>
            <View style={{flexDirection: 'row', marginVertical: '2.1%'}}>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e'}}>결제 시간</Text>
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#6e6e6e', marginLeft: '11.8%'}}>{this.datetimeParse(this.state.time)}</Text>
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
              <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 8, letterSpacing: 0.1, color: '#000000'}}>₩ {this.numberWithCommas(totalPrice)}</Text>
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