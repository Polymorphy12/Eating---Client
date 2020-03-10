import React, { Component } from "react";
import { Text, Image, View, FlatList, TouchableOpacity, ToastAndroid, SafeAreaView } from "react-native";
import axios from "axios";
import MyHeader from "../Component/MyHeader";
import MyFooter from "../Component/MyFooter";

export default class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state ={
            pageTitle: '즐겨찾는 메뉴',
            userEmail: props.navigation.getParam('userEmail'),
            timeSelect: 'lunch',
        }
    }

    componentDidMount(){
        axios.get('http://13.124.193.165:3000/users/getBookmark',{
                params: {
                    userEmail: this.state.userEmail,
                }
            }).then(response => {
                //ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                if (response.data === -1)   ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                else                        this.setState({data : response.data});
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
        });
    }

    numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    _renderItem = ({item}) => (
        <TouchableOpacity style = {{width: '100%', aspectRatio: 328 / 72, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eeeeee'}}
                            onPress={() => this.props.navigation.push('menuDetails',
                                {
                                    userEmail: this.state.userEmail,
                                    restaurant_name: item.restaurant_name,
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
            <View style={{flex: 1}}>
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>

                <View style={{paddingHorizontal: 16}}>
                    <View style={{marginVertical: 20, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{width: '50%', aspectRatio: 164 / 32, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'lunch' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                            disabled={this.state.timeSelect === 'lunch'}
                                            onPress={() => this.setState({timeSelect: 'lunch'})}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'lunch' ? '#ed6578' : '#000000'}}>점심</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '50%', aspectRatio: 164 / 32, borderBottomWidth: 2, borderBottomColor: this.state.timeSelect === 'dinner' ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                            disabled={this.state.timeSelect === 'dinner'}
                                            onPress={() => this.setState({timeSelect: 'dinner'})}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: 1.31, color: this.state.timeSelect === 'dinner' ? '#ed6578' : '#000000'}}>저녁</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <SafeAreaView style={{width: '100%', aspectRatio: 2 / 3}}>
                        <FlatList renderItem={this._renderItem} data={this.state.data} keyExtractor={item => String(item.menu_id)}></FlatList>
                    </SafeAreaView>
                </View>


                {/* 풋터를 바닥에 두기 위한 빈 공간 */}
                <View style={{flex: 1}}></View>

                <MyFooter navigation={this.props.navigation} mypageBoolean={true} userEmail={this.state.userEmail}></MyFooter>
            </View>
        );
    }
}