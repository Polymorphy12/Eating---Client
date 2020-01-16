import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      pageTitle: '장바구니',
    };
  }
    
  _renderItem = ({item}) => (
    <View>
      <View style={{height: 96, marginHorizontal: '3.6%', borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../assets/images/drawable-xxxhdpi/업체_봉구스.png')}
                    style={{width: 80, height: 80, marginVertical: '1.3%',}}
                    resizeMode={'cover'}></Image>
          </View>
          <View style={{marginLeft: 12, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>2019.09.11 점심</Text>
            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, lineHeight: 18, letterSpacing: 0.17, color: '#000000', marginTop: 7}}>봉구스밥버거</Text>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>햄치즈밥버거</Text>
            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 9, lineHeight: 10, letterSpacing: 0.11, color: '#000000'}}>₩ 3,000</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <TouchableOpacity style={{width: 96, height: 32, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed6578'}}
                            onPress={() => this.props.navigation.navigate('orderHistoryDetails')}>
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
        <TouchableOpacity style={{height: '6.9%', marginHorizontal: '10%', marginVertical: 23, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed6578'}}>
          <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 14, lineHeight: 18, letterSpacing: 0.17, color: '#ffffff'}}>점심 주문 마감까지 남은 시간 00:51:29</Text>
        </TouchableOpacity>
        <MyFooter navigation={this.props.navigation} orderBoolean={true}></MyFooter>
      </View>
    );
  }
}

const listView = {

}