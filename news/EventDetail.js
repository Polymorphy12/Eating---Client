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
            pageTitle: '잇힝소식',
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
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <ScrollView contentContainerStyle = {totalContainer}>
                    <Image
                        style={{width:"100%", aspectRatio: 328 / 100}}
                        source={{uri: 'http://13.124.193.165:3000/static/' + this.state.data.news_image}}
                        resizeMode={'stretch'}
                    ></Image>

                    <View style={{width: '100%', aspectRatio: 328 / 60, alignItems:'center', justifyContent:"center"}}>
                        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 18, letterSpacing: 0.22, color: '#000000'}}>기한 : {this.dateParse(this.state.data.date_start)} ~ {this.dateParse(this.state.data.date_end)}</Text>
                    </View>

                    <View style={{width: '100%', paddingHorizontal: 13.5}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 17, letterSpacing: 0.2, color: '#000000'}}>{this.state.data.title}</Text>
                        </View>

                        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 15, letterSpacing: 0.18, color: '#000000', marginTop: 16}}>
                            {/*`학식탈출이 드디어 어플로 출시 되었습니다~ ${"\n"}와~ 짝짝~ 실제로는 언제 출시 될까요~!${"\n"}출시 기념 프로모션으로${"\n"}${"\n"}라는 파격 프로모션을 준비했습니다~${"\n"}${"\n"}어서어서 충전해서 이득보러 갈까요~~${"\n"}고고링 ><`*/}
                            {this.state.data.description}
                        </Text>
                    </View>
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
    zIndex: -1,
    marginTop: 16,
    marginHorizontal: 16,
}