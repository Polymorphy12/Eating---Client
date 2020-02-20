import React, {Component} from 'react';
import {View, Text, FlatList, ToastAndroid} from 'react-native';
import axios from 'axios';

export default class CheckOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSelect: 'dinner',
            rawOrderList: [],
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
                else    this.setState({rawOrderList : response.data});
        })
            .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }

    renderOrderList = ({item}) => (
        <View style={{flexDirection: 'row', width: '100%', aspectRatio: 4, alignItems: 'center', justifyContent: 'space-between', borderWidth: 1}}>
            <Text>{item.menu_name}</Text>
            <Text>{item.amount} 개</Text>
        </View>
    );

    render () {
        var orderList = [];

        for(let i = 0; i < this.state.rawOrderList.length; i++) {
            let index = orderList.findIndex(elem => elem.menu_name === this.state.rawOrderList[i].menu_name);
            if (index === -1) {
                // let tempObj = {menu_name: this.state.rawOrderList[i].menu_name, amount: this.state.rawOrderList[i].amount};
                // orderList = orderList.concat(tempObj);
                orderList = orderList.concat({menu_name: this.state.rawOrderList[i].menu_name, amount: this.state.rawOrderList[i].amount});
            }
            else {
                orderList[index].amount += this.state.rawOrderList[i].amount;
            }
        }

        return (
            <View style={{flex: 1}}>
                {/* <Text>{JSON.stringify(this.state.rawOrderList) + '\n\n'}</Text>
                <Text>{JSON.stringify(orderList)}</Text> */}

                <FlatList 
                data={orderList}
                renderItem={this.renderOrderList}
                keyExtractor={item => String(item.menu_name)}/>
            </View>
        );
    }
}