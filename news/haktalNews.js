import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, FlatList, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Body,  Title, Left, Right, Footer, FooterTab, Tab } from 'native-base';
// import { MyHeader, ProgressBar } from './Component';
import MyHeader from '../Component/MyHeader';
import axios from 'axios';
import MyFooter from '../Component/MyFooter';

export default class HaktalNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "#fadee2",
      userEmail: props.navigation.getParam('userEmail'),
      pageTitle: "잇힝소식",
      data : [],
    };
  };

  componentDidMount(){
    axios.get('http://13.124.193.165:3000/news')
      .then(response => {
        this.setState({data : response.data});
        //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
       throw error;
     });
  }

  dateParse = (x) => String(x).substring(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1.$2.$3')

  renderItem = ({item}) => {
    return(
      <View style={{width:"100%", aspectRatio: 328 / 160}}>
          <Image
          // react-native에서 resizeMode에 대해서 따로 알아볼 것.
              style={{width:"100%", aspectRatio: 328 / 100, backgroundColor: "#ff0000"}}
              source={{uri: 'http://13.124.193.165:3000/static/' + item.news_image}}
              resizeMode={'stretch'}
          ></Image>
          <View style={{width:"100%", aspectRatio: 328 / 60, flexDirection:"row", alignItems:'center', justifyContent:"space-between" }}>
              <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 14, letterSpacing: 0.17, color: '#000000', marginLeft: 11}}>기한 : {this.dateParse(item.date_start)} ~ {this.dateParse(item.date_end)}</Text>
              <TouchableOpacity style={{width: "29.3%", aspectRatio: 96 / 32, alignItems:"center", justifyContent:"center", borderRadius: 5, backgroundColor: "#ed6578", marginHorizontal: 6}}
                  onPress={() => this.props.navigation.navigate('EventDetail', {id : item.id, userEmail: this.state.userEmail})}
                  activeOpacity={0.8}>
                  <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: 0.78, color: '#ffffff'}}>자세히 보기</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
        <View style={{margin: 16, flex: 1}}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => String(item.id)}
          />

        </View> 
        <MyFooter navigation={this.props.navigation} newsBoolean={true} userEmail={this.state.userEmail}></MyFooter>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});