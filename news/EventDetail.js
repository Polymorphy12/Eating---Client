import React from 'react';
import { View, Text, Image } from 'react-native';
import MyHeader from '../Component/MyHeader';
import MyFooter from '../Component/MyFooter';
import { ScrollView } from 'react-native-gesture-handler';

export default class EventDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = { period: '2019.10.01 ~ 2019.11.01' }
    }

    render() {
        return(
            <View style={{width: "100%", height: "100%"}}>
                <MyHeader navigation={this.props.navigation} pageTitle={"학탈소식"}></MyHeader>
                <ScrollView contentContainerStyle = {totalContainer}>
                <View style={{width:"100%", height:"17.2%", alignItems:"center", justifyContent:"center"}}>
                    <Image
                        style={{width:"100%", height:"100%", resizeMode:"stretch"}}
                        source={require('../assets/images/drawable-xxxhdpi/배너_포인트충전이벤트.png')}
                    ></Image>
                </View>
                <View style={{width:"100%", height:"7.8%", alignItems:'flex-start', justifyContent:"center", marginHorizontal:5.5}}>
                    <Text>기한 : {this.state.period}</Text>
                </View>
                <Text style={{width: "90.8%", height: "9%", marginHorizontal:"4.6%", fontSize:17}}>{"학탈 어플 출시 기념 포인트 충전 EVENT!"}</Text>
                <Text style={{width: "90.8%", marginHorizontal:"4.6%", fontSize:15}}>
                    {`학식탈출이 드디어 어플로 출시 되었습니다~ ${"\n"}와~ 짝짝~ 실제로는 언제 출시 될까요~!${"\n"}출시 기념 프로모션으로${"\n"}${"\n"}라는 파격 프로모션을 준비했습니다~${"\n"}${"\n"}어서어서 충전해서 이득보러 갈까요~~${"\n"}고고링 ><`}
                </Text>
                </ScrollView>
                
                <MyFooter navigation={this.props.navigation} newsBoolean={true}></MyFooter>
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