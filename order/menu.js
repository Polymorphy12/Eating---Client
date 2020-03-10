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
      popularList: [],
      elseList: [],
      pageTitle: props.navigation.getParam('restaurant_name', '봉구스밥버거'), 
      restaurant_name: props.navigation.getParam('restaurant_name', '봉구스밥버거'),
      userEmail : props.navigation.getParam('userEmail', ''),
      timeSelect: props.navigation.getParam('timeSelect'),
      showPopularList: true,
      showElseList: false,
    }
    //console.log(this.state.restaurant_name);
  }

  numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  componentDidMount(){
    //console.log('SelectRestaurant componentDidMount!!');
    
    axios.get('http://13.124.193.165:3000/menus',{
          params: {
            restaurant_name : this.state.restaurant_name,
          }
      })
      .then(response => {
        //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
        for(let i = 0; i < response.data.length; i++) {
          if (response.data[i].popular) this.setState({popularList: this.state.popularList.concat(response.data[i])})
          else                          this.setState({elseList: this.state.elseList.concat(response.data[i])})
        }
        // this.setState({data : response.data});
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
        throw error;
      });
  }
    
  _renderItem = ({item}) => (
    <TouchableOpacity style = {{width: '100%', aspectRatio: 328 / 72, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee'}}
                      onPress={() => this.props.navigation.push('menuDetails',
                        {
                          userEmail: this.state.userEmail,
                          restaurant_name: this.state.restaurant_name,
                          timeSelect: this.state.timeSelect,
                          menuID: item.menu_id,
                          menuImage: item.menu_image,
                          menuName: item.menu_name,
                          menuPrice: item.menu_price,
                        }
                      )}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 56, height : 56}}              
          source={{uri: 'http://13.124.193.165:3000/static/' + item.menu_image}}></Image>
        <View style = {{marginLeft: 40, flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#273951'}}>{item.menu_name}</Text>
          <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#a2a9b3'}}>{this.numberWithCommas(item.menu_price)}원</Text>
        </View>
      </View>
    </TouchableOpacity>      
  );

  render() {
    return (
      <View style= {{flex: 1}}>
        <OrderHeader 
        navigation={this.props.navigation} 
        pageTitle={this.state.pageTitle}
        username={this.state.userEmail}></OrderHeader>

        {/* <Text>{JSON.stringify(this.state.data[0])}</Text> */}

        <View style={{marginHorizontal: 16}}>
          <TouchableOpacity style={{aspectRatio: 328 / 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                            onPress={() => this.setState({showPopularList: !this.state.showPopularList})}>
            <Text style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 16, letterSpacing: -0.23, color: '#000000'}}>인기메뉴</Text>
            <Image style={{width: 30, height: 30}} 
                  source={this.state.showPopularList ? require('../assets/images/drawable-xxxhdpi/아이콘_리스트접기.png') : require('../assets/images/drawable-xxxhdpi/아이콘_리스트펼치기.png')}></Image>
            
          </TouchableOpacity>

          {
            this.state.showPopularList ?
            <View style={{height: this.state.popularList.length >= 3 ? 216 : this.state.popularList.length * 72}}>
              <FlatList data={this.state.popularList} renderItem={this._renderItem} keyExtractor={item => String(item.menu_id)} contentContainerStyle={listView}/>
            </View> :
            <View></View>
          }

          {/* <Text>{JSON.stringify(this.state.popularList.length)}</Text> */}
          
        </View>

        <View style={{height : 8, backgroundColor: '#eeeeee'}}></View>

        <View style={{marginHorizontal: 16}}>

          <TouchableOpacity style={{aspectRatio: 328 / 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                            onPress={() => this.setState({showElseList: !this.state.showElseList})}>
            <Text style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 16, letterSpacing: -0.23, color: '#000000'}}>모든메뉴</Text>
            <Image style={{width: 30, height: 30}} 
                  source={this.state.showElseList ? require('../assets/images/drawable-xxxhdpi/아이콘_리스트접기.png') : require('../assets/images/drawable-xxxhdpi/아이콘_리스트펼치기.png')}></Image>
            
          </TouchableOpacity>

          {
            this.state.showElseList ?
            <View style={{height: this.state.elseList.length >= 3 ? 216 : this.state.elseList.length * 72}}>
              <FlatList data={this.state.elseList} renderItem={this._renderItem} keyExtractor={item => String(item.menu_id)} contentContainerStyle={listView}/>
            </View> :
            <View></View>
          }

        </View>

        <View style={{height : 8, backgroundColor: '#eeeeee'}}></View>

        <View style={{flex: 1, marginHorizontal: 16}}>
          <Text style={{fontFamily: 'S-CoreDream5-Medium', fontSize: 12, letterSpacing: -0.6, color: '#9b9b9b', marginTop: 24}}>메뉴 이미지는 실제 음식과 다를 수 있습니다.</Text>
        </View>
        

        <MyFooter navigation={this.props.navigation} orderBoolean={true} userEmail={this.state.userEmail}></MyFooter>
      </View>
    );
  }
}

const listView = {
//   // flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
}