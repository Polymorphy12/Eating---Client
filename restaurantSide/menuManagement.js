import React, {Component} from 'react';
import {View, Text, FlatList, ToastAndroid, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import SelectRestaurantClock from '../Component/selectRestaurantClock';
import RestaurantSideFooter from '../Component/restaurantSideFooter';

export default class MenuManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '사장님 페이지',
            togglePage: 0,
            ceoID: props.navigation.getParam('ceoID'),
        }
    }

    componentDidMount () {
        axios.get('http://13.124.193.165:3000/menus',{
            params: {
                restaurant_name : '고기다비빔밥',
            }
        }).then(response => {
            this.setState({menuList: response.data});
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }

    renderMenuItem = ({item}) => (
        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: item.menu_id === this.state.selectedItem ? '#ed6578' : '#ffffff'}}
                            onPress={() => this.setState({selectedItem: item.menu_id})}>
            <View style={{width: '64.86%', aspectRatio: 192 / 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 10, letterSpacing: -0.5, color: item.menu_id === this.state.selectedItem ? '#ffffff' :'#777777'}}>{item.menu_name}</Text>
            </View>

            <View style={{width: '35.14%', aspectRatio: 104 / 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 10, letterSpacing: -0.5, color: item.menu_id === this.state.selectedItem ? '#ffffff' :'#777777'}}>{this.numberWithCommas(item.menu_price)}원</Text>
            </View>
        </TouchableOpacity>
    );

    numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    render () {
        return (
            <View style={{flex: 1}}>
                <View style={{width: '100%', aspectRatio: 360 / 52, borderBottomWidth: 1, borderBottomColor: '#d6d6d6'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: -0.34, color: '#000000'}}>{this.state.pageTitle}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%', aspectRatio: 360 / 48}}>
                    <TouchableOpacity style={{flex: 1, borderBottomWidth: 2, borderBottomColor: this.state.togglePage === 0 ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                        disabled={this.state.togglePage === 0}
                                        onPress={() => this.setState({togglePage: 0})}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: this.state.togglePage === 0 ? '#ed6578' : '#6e6e6e'}}>메뉴 추가/수정/삭제</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1, borderBottomWidth: 2, borderBottomColor: this.state.togglePage === 1 ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                        disabled={this.state.togglePage === 1}
                                        onPress={() => this.setState({togglePage: 1})}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: this.state.togglePage === 1 ? '#ed6578' : '#6e6e6e'}}>통계</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1, borderBottomWidth: 2, borderBottomColor: this.state.togglePage === 2 ? '#ed6578' : '#ffffff', alignItems: 'center', justifyContent: 'center'}}
                                        disabled={this.state.togglePage === 2}
                                        onPress={() => this.setState({togglePage: 2})}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: this.state.togglePage === 2 ? '#ed6578' : '#6e6e6e'}}>운영 정보 수정</Text>
                    </TouchableOpacity>
                </View>

                {
                this.state.togglePage === 0 ? // 메뉴 추가/수정/삭제
                    <View style={{paddingHorizontal: 32}}>
                        <View style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{flexDirection: 'row', marginTop: 22}}>
                                <Image style={{width: 16, height: 16}}
                                        source={require('../assets/images/drawable-xxxhdpi/icon_add_menu.png')}/>
                                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 12, letterSpacing: -0.6, color: '#6e6e6e', marginLeft: 8}}>메뉴 추가하기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', borderWidth: 1, borderColor: '#cbcbcb', backgroundColor: '#ededed', marginTop: 8}}>
                            <View style={{width: '64.86%', aspectRatio: 192 / 30, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#000000'}}>메뉴명</Text>
                            </View>

                            <View style={{width: '35.14%', aspectRatio: 104 / 30, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderColor: '#cbcbcb'}}>
                                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#000000'}}>가격</Text>
                            </View>
                        </View>

                        <FlatList style={{borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#cbcbcb'}} data={this.state.menuList} renderItem={this.renderMenuItem} keyExtractor={item => item.menu_id}/>
                    </View>

                :this.state.togglePage === 1 ? // 통계
                    <View>

                    </View>

                :this.state.togglePage === 2 ? // 운영 정보 수정
                    <View>
                            
                    </View>
                
                :   <View></View>              // 클라이언트 해킹
                }

                {/* <Text>{JSON.stringify(this.state.menuList)}</Text> */}

                <View style={{flex: 1}}></View>

                <RestaurantSideFooter navigation={this.props.navigation} menuManagementBoolean={true} ceoID={this.state.ceoID}></RestaurantSideFooter>
            </View>
        );
    }
}