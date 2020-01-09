import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, FlatList, StyleSheet} from 'react-native';
import { Container, Body,  Title, Left, Right, Footer, FooterTab } from 'native-base';
// import { MyHeader, ProgressBar } from './Component';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';
import MyFooter from '../Component/MyFooter';

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

export default class HaktalNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonColor: "#fadee2", pageTitle: "학탈소식" };
  };

  showDetail() {

  }

  renderItem({item}) {
      return(
        <View style={{width:"100%", height: 183}}>
            <Image
            // react-native에서 resizeMode에 대해서 따로 알아볼 것.
                style={{width:"100%", height:"68.75%", backgroundColor: "#ff0000"}}
                source={require('../assets/images/drawable-xxxhdpi/배너_포인트충전이벤트.png')}
            ></Image>
            <View style={{width:"100%", height:"31.25%", flexDirection:"row", alignItems:'center', justifyContent:"space-between", flex: 1}}>
                <Text style={{alignItems:'center', justifyContent:"center", flex: 1, fontSize:15, marginHorizontal:5.5}}>기한 : {item.period}</Text>
                <TouchableOpacity style={{width: "26.7%", height: "64%", alignItems:"center", justifyContent:"center", borderRadius: 5, backgroundColor: "#ed6578", marginHorizontal: 6}}
                    onPress={() => this.props.navigation.navigate('EventDetail')}
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
        <FlatList
            style={{width:"100%", height:"100%",}}
            data={DATA}
            renderItem={({item}) => this.renderItem({ item })}
            keyExtractor={item => item.id}
        />
        <MyFooter navigation={this.props.navigation}></MyFooter>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});