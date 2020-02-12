import React from 'react';
import { View, Text, Image, ToastAndroid } from 'react-native';
import MyHeader from '../Component/MyHeader';
import MyFooter from '../Component/MyFooter';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default class EventDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : props.navigation.getParam('id', 0),
            userEmail: props.navigation.getParam('userEmail'),
            data: {},
        };
    }

    componentDidMount(){
        axios.get('http://13.124.193.165:3000/news/detail', {
            params: {
                id: this.state.id,
            }
        })
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

    dateParse = (x) => String(x).substring(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1.$2.$3');

    render() {
        return(
            <View style={{width: "100%", height: "100%"}}>
                <MyHeader navigation={this.props.navigation} pageTitle={"학탈소식"}></MyHeader>
                <ScrollView contentContainerStyle = {totalContainer}>
                    <View style={{width:"100%", height:"17.2%", alignItems:"center", justifyContent:"center"}}>
                        <Image
                            style={{width:"100%", height:"100%", resizeMode:"stretch"}}
                            source={{uri: 'http://13.124.193.165:3000/static/' + this.state.data.news_image}}
                        ></Image>
                    </View>
                    <View style={{width:"100%", height:"7.8%", alignItems:'flex-start', justifyContent:"center", marginHorizontal:5.5}}>
                        <Text>기한 : {this.dateParse(this.state.data.date_start)} ~ {this.dateParse(this.state.data.date_end)}</Text>
                    </View>
                    <Text style={{width: "90.8%", height: "9%", marginHorizontal:"4.6%", fontSize:17}}>{this.state.data.title}</Text>
                    <Text style={{width: "90.8%", marginHorizontal:"4.6%", fontSize:15}}>
                        {/*`학식탈출이 드디어 어플로 출시 되었습니다~ ${"\n"}와~ 짝짝~ 실제로는 언제 출시 될까요~!${"\n"}출시 기념 프로모션으로${"\n"}${"\n"}라는 파격 프로모션을 준비했습니다~${"\n"}${"\n"}어서어서 충전해서 이득보러 갈까요~~${"\n"}고고링 ><`*/}
                        {this.state.data.description}
                    </Text>
                </ScrollView>
                
                <MyFooter navigation={this.props.navigation} newsBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
            
        );
    };
}

const totalContainer = {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    //justifyContent: "center",
    zIndex: -1
}