import React, {Component} from 'react';
import {View, Text, FlatList, ToastAndroid, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import SelectRestaurantClock from '../Component/selectRestaurantClock';
import RestaurantSideFooter from '../Component/restaurantSideFooter';

export default class CheckOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '사장님 페이지',
            timeSelect: 'lunch',
            rawOrderList: [],
            deliv_locations: [],
        }
    }

    componentDidMount () {
        axios.get('http://13.124.193.165:3000/purchase_summary/getOrderList',{
        params:
            {
                //날짜랑 가게이름 추가해서 오늘자, 가게별 목록을 볼 수 있게 만들자.
                timeSelect : this.state.timeSelect,
            }
        })
            .then(response => {
                if (response.data === -1)   ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                else    this.setState({deliv_locations: response.data.deliv_locations, rawOrderList : response.data.rawOrderList});
        })
            .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }

    numberWithCommas = (x) =>  String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    renderLocationList = ({item}) => (
        <View style={{width: '100%', marginBottom: 32}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, letterSpacing: -1, color: '#010101'}}>{item.location}</Text>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {
                        axios.get('http://13.124.193.165:3000/purchase_summary/getOrderList',{
                            params:
                                {
                                    //날짜랑 가게이름 추가해서 오늘자, 가게별 목록을 볼 수 있게 만들자.
                                    timeSelect : this.state.timeSelect,
                                }
                            })
                                .then(response => {
                                    if (response.data === -1)   ToastAndroid.show('시스템에 문제가 발생했습니다. 고객센터에 문의해주세요.', ToastAndroid.LONG);
                                    else    this.setState({deliv_locations: response.data.deliv_locations, rawOrderList : response.data.rawOrderList});
                            })
                                .catch(function(error) {
                                console.log('There has been a problem with your fetch operation: ' + error.message);
                                // ADD THIS THROW error
                                throw error;
                            });
                    }}>
                        <Image style={{width: 24, height: 24}}
                                source={require('../assets/images/drawable-xxxhdpi/icon_refresh.png')}/>
                    </TouchableOpacity>

                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 16, letterSpacing: -0.8, color: '#6e6e6e', marginLeft: 20}}>총 {item.orderList.length}건</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', width: '100%', aspectRatio: 328 / 26, backgroundColor: '#ededed', borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#cbcbcb', marginTop: 8}}>
                <View style={{width: '17.07%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111'}}>주문번호</Text>
                </View>

                <View style={{width: '14.02%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111'}}>고객명</Text>
                </View>

                <View style={{width: '68.90%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111'}}>메뉴명</Text>
                </View>
            </View>

            <FlatList style={{width: '100%', borderLeftWidth: 1, borderColor: '#cbcbcb'}}
                                data={item.orderList}
                                keyExtractor={item => `${item.location} - ${item.menu_name}`} // 이건 나중에 주문번호로 바꾸자.
                                renderItem={this.renderOrderList}/>

            <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 12, letterSpacing: -0.6, color: '#9b9b9b', marginTop: 16}}>배부 담당자: 이신형(010-5264-7601)</Text>
                <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 12, letterSpacing: -0.6, color: '#9b9b9b', marginTop: 8}}>총 결제 금액: {this.numberWithCommas(item.totalPrice)}원</Text>
            </View>
        </View>
    );

    renderOrderList = ({item}) => (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{width: '17.07%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111', paddingVertical: 4}}>A01</Text>
            </View>

            <View style={{width: '14.02%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111', paddingVertical: 4}}>{item.user_name}</Text>
            </View>

            <View style={{width: '68.90%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#cbcbcb'}}>
                <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 12, letterSpacing: -0.6, color: '#111111', paddingVertical: 4}}>{item.menu_name} {item.amount}개</Text>
            </View>
        </View>
    );

    render () {
        // 1. 점심/저녁 분류
        // 2. 배달장소에 따른 분류

        var lunchOrderList = [], dinnerOrderList = [];

        for(let i = 0; i < this.state.deliv_locations.length; i++) {
            lunchOrderList = lunchOrderList.concat({location: this.state.deliv_locations[i].location, orderList: [], totalPrice: 0});
            dinnerOrderList = dinnerOrderList.concat({location: this.state.deliv_locations[i].location, orderList: [], totalPrice: 0});
        }

        for(let i = 0; i < this.state.rawOrderList.length; i++) {
            if (this.state.rawOrderList[i].lunch) {
                let index = lunchOrderList.findIndex(elem => elem.location === this.state.rawOrderList[i].purchase_location);
                lunchOrderList[index].orderList = lunchOrderList[index].orderList.concat({user_name: this.state.rawOrderList[i].user_name, menu_name: this.state.rawOrderList[i].menu_name, amount: this.state.rawOrderList[i].amount});
                lunchOrderList[index].totalPrice += this.state.rawOrderList[i].menu_price * this.state.rawOrderList[i].amount;
            }
            else {
                let index = dinnerOrderList.findIndex(elem => elem.location === this.state.rawOrderList[i].purchase_location);
                dinnerOrderList[index].orderList = dinnerOrderList[index].orderList.concat({user_name: this.state.rawOrderList[i].user_name, menu_name: this.state.rawOrderList[i].menu_name, amount: this.state.rawOrderList[i].amount});
                dinnerOrderList[index].totalPrice += this.state.rawOrderList[i].menu_price * this.state.rawOrderList[i].amount;
            }
        }

        for(let i = 0; i < lunchOrderList.length; i++) {

        }

        return (
            <View style={{flex: 1}}>
                <View style={{width: '100%', aspectRatio: 360 / 52, borderBottomWidth: 1, borderBottomColor: '#d6d6d6'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12}}>
                        <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: -0.34, color: '#000000'}}>{this.state.pageTitle}</Text>
                    </View>
                </View>

                <View style={{flex: 1,paddingHorizontal: 16}}>
                    <View style={{flexDirection: 'row', marginTop: 32}}>
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

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <SelectRestaurantClock style={{height: 20, alignItems: 'center', justifyContent: 'center', marginVertical: 32}} timeSelect={this.state.timeSelect}></SelectRestaurantClock>
                    </View>
                    
                    <FlatList style={{flex: 1}}
                                data={this.state.timeSelect === 'lunch' ? lunchOrderList : dinnerOrderList}
                                keyExtractor={item => item.location}
                                renderItem={this.renderLocationList}/>

                    {/* <Text style={{fontSize: 8, backgroundColor: 'green'}}>{JSON.stringify(dinnerOrderList)}</Text> */}
                    {/* <Text style={{fontSize: 8, backgroundColor: 'red'}}>{JSON.stringify(this.state.rawOrderList)}</Text> */}
                </View>

                <RestaurantSideFooter navigation={this.props.navigation} orderBoolean={true} ceoID={this.state.ceoID}></RestaurantSideFooter>
            </View>
        );
    }
}