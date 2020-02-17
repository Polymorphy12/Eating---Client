import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Alert, Modal, ToastAndroid } from "react-native";
import OrderHeader from "../Component/OrderHeader";
import CutLine from '../Component/CutLine';
import ShoppingCartProgressBar from '../Component/ShoppingCartProgressBar';
import MyFooter from "../Component/MyFooter";
import axios from "axios";

export default class PurchaseFinalCheck extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "주문내역",
            userEmail : props.navigation.getParam('userEmail', ''),
            timeSelect : props.navigation.getParam('timeSelect'),
            modalVisible: false,
            selectedLocation: '0',
            locationData: [],
            reloadFlag: 0,
            data: [],
            price_info : {},
            deliv_info : {}
        }
    }

    numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    componentDidMount(){
        axios.get('http://13.124.193.165:3000/purchase_summary/plan_summary',{
            params: {
                userEmail : this.state.userEmail,
                timeSelect : this.state.timeSelect,
            }
        }).then(response => {
            console.log("ssss",response.data);
            //Alert.alert(JSON.stringify(response.data.menu_info), '');
            this.setState({
                data : response.data.menu_info,
                price_info : response.data.price_info,
                deliv_info: response.data.deliv_info,
                location_image: response.data.menu_info[0].location_image,
                location_map: response.data.menu_info[0].location_map,
                locationData : response.data.location_info,
            });
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }

    renderLocation = ({item}) => (
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24,}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => this.setState({selectedLocation: item.location})}>
                <View style={{width: 20, height: 20, borderWidth: 2, borderColor: this.state.selectedLocation === item.location ? '#ed6578' : '#757575', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: this.state.selectedLocation === item.location ? '#ed6578' :'#ffffff'}}></View>
                </View>
                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.8, color: '#333333', marginLeft: 8}}>{item.location}</Text>
            </TouchableOpacity>
        </View>
    );
    

      render() {        
        return (
            <View style={{flex: 1}}>
                <Modal visible={this.state.modalVisible} transparent={true} animationType = {"fade"} onRequestClose = {() => this.setState({modalVisible: false})}>
                    <View style={{flex: 1, backgroundColor : "#00000080"}}>
                        <View style={{marginHorizontal: 28, alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{marginTop: 36, marginBottom: 12}}
                                                onPress={() => this.setState({modalVisible: false, selectedLocation: '0'})}>
                                <Image source={require('../assets/images/drawable-xxxhdpi/아이콘_닫기.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{borderWidth: 1, borderColor: '#707070', backgroundColor: '#ffffff', marginHorizontal: 28, paddingHorizontal: 32}}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: -1.2, color: '#333333', marginTop: 32}}>배달장소 변경</Text>
                                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 16, letterSpacing: -0.8, color: '#9b9b9b', marginTop: 24}}>배달예정시간 40분 전까지 가능합니다.</Text>
                            </View>
                            <FlatList data={this.state.locationData} renderItem={this.renderLocation} keyExtractor={item => String(item.id)} contentContainerStyle={{}}></FlatList>
                            {/* <Text>{JSON.stringify(this.state.locationData)}</Text> */}

                            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 32}}>
                                <TouchableOpacity style={{width: '78.9%', height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: this.state.selectedLocation === '0' ? '#dddddd' :'#ed6578'}}
                                                    disabled={this.state.selectedLocation === '0' ? true : false}
                                                    onPress={() => {
                                                        axios.put('http://13.124.193.165:3000/location',{
                                                            userEmail : this.state.userEmail,
                                                            purchase_location : this.state.selectedLocation,
                                                            timeSelect: this.state.timeSelect,                          
                                                        })
                                                        .then(response => {
                                                            // ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                                            var index = this.state.locationData.findIndex(elem => elem.location === this.state.selectedLocation)
                                                            this.state.deliv_info.deliv_location = this.state.locationData[index].location;
                                                            this.state.location_image = this.state.locationData[index].location_image;
                                                            this.state.location_map = this.state.locationData[index].location_map;
                                                            this.setState({reloadFlag: this.state.reloadFlag, modalVisible: false, selectedLocation: '0'});
                                                        })
                                                        .catch(function(error) {
                                                            console.log('There has been a problem with your fetch operation: ' + error.message);
                                                            // ADD THIS THROW error
                                                            throw error;
                                                        });
                                                    }}>
                                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#ffffff'}}>배달장소 저장하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <OrderHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle} username={this.state.userEmail}></OrderHeader>
            
                <ShoppingCartProgressBar progress={3}></ShoppingCartProgressBar> 
                <View style={{borderWidth: 1, borderRadius: 5, marginHorizontal: 16, marginTop: 8, paddingBottom: 32}}>
                    <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000', marginHorizontal: 16, marginTop: 16}}>배달 정보</Text>

                    <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 24}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>주문번호</Text>
                        <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#000000', marginLeft: 32}}>{this.state.deliv_info.order_no}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 16, marginTop: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>배달일시</Text>
                        {/* <Text>{this.state.deliv_info.order_no}</Text> */}
                        <View>
                            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#000000', marginLeft: 32}}>2월 10일</Text>
                            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#000000', marginLeft: 32}}>{this.state.timeSelect === 'lunch' ? '점심 (오전 12시 00분)' : '저녁 (오후 6시 00분)'}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 16, marginTop: 16}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>배달장소</Text>
                            {/* <Text>{this.state.deliv_info.order_no}</Text> */}
                            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#000000', marginLeft: 32}}>{this.state.deliv_info.deliv_location}</Text>
                        </View>

                        <TouchableOpacity style={{marginRight: 8}}
                                            onPress={() => this.setState({modalVisible: true})}>
                            <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.6, color: '#ed6578'}}>변경하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', margin: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#ffffff'}}>주문번호</Text>
                        {/* <Text>{this.state.deliv_info.order_no}</Text> */}
                        <Image style={{width: 72, height: 72, marginLeft: 32, backgroundColor: '#eeeeee'}} source={{uri: 'http://13.124.193.165:3000/static/' + this.state.location_image}}></Image>
                        <Image style={{width: 72, height: 72, marginLeft: 24, backgroundColor: '#eeeeee'}} source={{uri: 'http://13.124.193.165:3000/static/' + this.state.location_map}}></Image>
                    </View>

                    <View style={{height: 8, backgroundColor: '#eeeeee'}}></View>

                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eeeeee', margin: 16, paddingBottom: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#000000'}}>결제 내역</Text>
                        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 16, letterSpacing: -0.8, color: '#9b9b9b', marginLeft: 32}}>결제미완료</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>총 주문 가격</Text>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 16, letterSpacing: -0.8, color: '#333333'}}>{this.numberWithCommas(this.state.price_info.total_price)} 원</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>포인트 할인</Text>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 16, letterSpacing: -0.8, color: '#333333'}}>- {this.numberWithCommas(this.state.price_info.discount)} 원</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 16}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.23, color: '#686868'}}>최종 결제 금액</Text>
                        <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 16, letterSpacing: -0.8, color: '#ed6578'}}>{this.numberWithCommas(this.state.price_info.total_price - this.state.price_info.discount)} 원</Text>
                    </View>
                </View>
                {/* <Text>{JSON.stringify(this.state.locationData)}</Text> */}
            </View>

            
        );
    }
}