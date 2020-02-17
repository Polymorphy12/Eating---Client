import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, FlatList, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Body,  Title, Left, Right, Footer, FooterTab, Tab } from 'native-base';
// import { MyHeader, ProgressBar } from './Component';
import MyHeader from '../Component/MyHeader';
import axios from 'axios';
import MyFooter from '../Component/MyFooter';

/*
const DATA = [
    {
      id: '1',
      imageSource: '배너_마카롱.png',
      period: '2019.10.01 ~ 2019.11.01',
    },
    {
      id: '2',
      imageSource: '배너_서브웨이할인행사.png',
      period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
      id: '3',
      imageSource: '배너_포인트충전이벤트.png',
      period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
        id: '4',
        imageSource: '배너_포인트충전이벤트.png',
        period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
        id: '5',
        imageSource: '배너_포인트충전이벤트.png',
        period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
        id: '6',
        imageSource: '배너_포인트충전이벤트.png',
        period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
        id: '7',
        imageSource: '배너_포인트충전이벤트.png',
        period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
    {
        id: '8',
        imageSource: '배너_포인트충전이벤트.png',
        period: 'YYYY.MM.DD ~ YYYY.MM.DD',
    },
  ];
*/

export default class HaktalNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "#fadee2",
      userEmail: props.navigation.getParam('userEmail'),
      pageTitle: "학탈소식",
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
      <View style={{width:"100%", height: 183}}>
          <Image
          // react-native에서 resizeMode에 대해서 따로 알아볼 것.
              style={{width:"100%", height:"68.75%", backgroundColor: "#ff0000"}}
              source={{uri: 'http://13.124.193.165:3000/static/' + item.news_image}}
              resizeMode={'stretch'}
          ></Image>
          <View style={{width:"100%", height:"31.25%", flexDirection:"row", alignItems:'center', justifyContent:"space-between", flex: 1}}>
              <Text style={{alignItems:'center', justifyContent:"center", flex: 1, fontSize:15, marginHorizontal:5.5}}>기한 : {this.dateParse(item.date_start)} ~ {this.dateParse(item.date_end)}</Text>
              <TouchableOpacity style={{width: "26.7%", height: "64%", alignItems:"center", justifyContent:"center", borderRadius: 5, backgroundColor: "#ed6578", marginHorizontal: 6}}
                  onPress={() => this.props.navigation.navigate('EventDetail', {id : item.id, userEmail: this.state.userEmail})}
                  activeOpacity={0.8}>
                  <Text style={{color: "white", padding: 5}}>자세히 보기</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
        <View style={{marginHorizontal: 16, marginTop: 16, flex: 1}}>
          <FlatList
              style={{width:"100%", height:"100%"}}
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