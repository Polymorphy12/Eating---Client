import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, ToastAndroid } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";
import axios from "axios";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageTitle: '현재 주문내역',
      userEmail : props.navigation.getParam('userEmail', ''),
    };
  }

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/purchase_summary/getSimpleOrderLog',{
        params: {
          userEmail : this.state.userEmail,
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

  dateParse = (x) => String(x).substring(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1.$2.$3');
  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
  _renderItem = ({item}) => (
    <View>
      <View style={{height: 96, marginHorizontal: '3.6%', borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={{uri: 'http://13.124.193.165:3000/static/' + item.restaurant_image}}
                    style={{width: 80, height: 80, marginVertical: '1.3%',}}
                    resizeMode={'cover'}></Image>
          </View>
          <View style={{marginLeft: 12, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>{this.dateParse(item.deliv_date)} {item.lunch === true ? '점심' : '저녁'}</Text>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, lineHeight: 18, letterSpacing: 0.17, color: '#000000', marginTop: 7}}>{item.sample_restaurant}</Text>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>{item.sample_menu_name}</Text>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>₩ {this.numberWithCommas(item.sample_menu_price)}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <TouchableOpacity style={{width: 96, height: 32, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed6578'}}
                            onPress={() => this.props.navigation.navigate('orderHistoryDetails', {id : item.id, sample_restaurant: item.sample_restaurant, time: item.pay_date})}>
            <Text style={{fontFamily:'S-CoreDream-5Medium', fontSize: 12, lineHeight: 15, letterSpacing: 0.78, color: '#ffffff'}}>상세주문내역</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  render() {
    const {navigation } = this.props;

    return (
      <View style= {{ flex: 1 }}>
        <OrderHeader navigation={this.props.navigation} 
                      pageTitle={this.state.pageTitle}
                      username={this.state.username}></OrderHeader>
        <FlatList 
          data={this.state.data}
          renderItem={this._renderItem}
          contentContainerStyle={listView}/>
          
        {/*<Text>{JSON.stringify(this.state.data)}</Text>*/}

        <TouchableOpacity style={{height: '6.9%', marginHorizontal: '10%', marginVertical: 23, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed6578'}}>
          <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 14, lineHeight: 18, letterSpacing: 0.17, color: '#ffffff'}}>점심 주문 마감까지 남은 시간 00:51:29</Text>
        </TouchableOpacity>

        <MyFooter navigation={this.props.navigation} orderBoolean={true} userEmail={this.state.userEmail}></MyFooter>
      </View>
    );
  }
}

const listView = {

}