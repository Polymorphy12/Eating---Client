import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert, ToastAndroid, Clipboard } from "react-native";
import OrderHeader from "../Component/OrderHeader";
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import axios from "axios";

export default class Payment extends Component {
    constructor (props) {
        super (props);
        this.state = {
            userEmail: props.navigation.getParam('userEmail', ''),
            timeSelect: props.navigation.getParam('timeSelect'),
            paymentMethod: props.navigation.getParam('paymentMethod'),
            deliv_date: props.navigation.getParam('deliv_date'),
            pageTitle: '배달 주문하기'
        }
    }

    render() {
        return (
            <View style= {{ flex: 1 }}>
        
                <OrderHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle} username={this.state.userEmail}></OrderHeader>        
                <ShoppingCartProgressBar progress={2}></ShoppingCartProgressBar>

                <ScrollView style={{borderWidth: 1, borderRadius: 5, marginHorizontal: 16, marginTop: 8, padding: 16}}>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000'}}>{this.state.paymentMethod} 계좌안내</Text>

                    {
                    this.state.paymentMethod === '무통장입금' ?

                        <View style={{marginTop: 32}}>
                            <Text style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 20, letterSpacing: -1, color: '#ed6578'}}>카카오뱅크 팀 DS</Text>
                            
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16}}>
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: -1.2, color: '#ed6578'}}>3333-12-8026602</Text>
                                <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                                    onPress={() => {
                                                        Clipboard.setString('카카오뱅크 3333-12-8026602');
                                                        ToastAndroid.show('계좌번호가 클립보드에 복사되었습니다.', ToastAndroid.SHORT);
                                                    }}>
                                    <Text style={{fontFamily: 'Roboto-Medium', fontSize: 16, letterSpacing: -0.8, color: '#9b9b9b'}}>계좌 복사하기</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.8, color: '#333333', marginTop: 28}}>{`점심 주문은\n당일 10:00 까지 입금 부탁 드립니다.`}</Text>

                            <Text style={{fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.8, color: '#333333', marginTop: 28}}>{`저녁 주문은\n당일 17:00 까지 입금 부탁 드립니다.`}</Text>
                        </View> :

                        <View>
                            <Text>여기에 다른 결제방법이 들어가야함</Text>
                        </View>
                    }
                </ScrollView>

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{width: '80%', aspectRatio: 288 / 44, borderRadius: 100, backgroundColor: '#ed6578', alignItems: 'center', justifyContent: 'center', marginVertical: 32}}
                                        onPress={() => {
                                            this.props.navigation.navigate('purchaseFinalCheck', {
                                                userEmail: this.state.userEmail,
                                                timeSelect: this.state.timeSelect,
                                                deliv_date: this.state.deliv_date,
                                            });
                                        }}>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 24, letterSpacing: -1.2, color: '#ffffff'}}>주문내역 확인하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}