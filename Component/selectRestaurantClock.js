import React, {Component} from 'react';
import { Text, View } from 'react-native';
// import moment from 'moment';
import moment from 'moment-timezone'

export default class SelectRestaurantClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lunchLimit: moment('0930', 'HHmm'),
            dinnerLimit: moment('1600', 'HHmm'),
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    componentDidMount() {
        this.timer = setInterval(() => {
            // this.setState({curTime: moment().tz('Asia/Seoul').format('YYYY년 MM월 DD일 hh:mm:ss')});
            this.setState(
                {
                    lunchDiff: this.state.lunchLimit.diff(moment().tz('Asia/Seoul'), 'minutes'),
                    dinnerDiff: this.state.dinnerLimit.diff(moment().tz('Asia/Seoul'), 'minutes'),
                });
        }, 333);
    }

    render() {
        return(
            <View style={this.props.style}>
                {
                    this.props.timeSelect === 'lunch' ? 
    
                    (this.state.lunchDiff >= 0 && this.state.lunchDiff <= 180 ?
                    <Text style={clockTextStyle}>{`점심 주문 마감까지 남은 시간: ${Math.floor(this.state.lunchDiff / 60) + '시간 ' + this.state.lunchDiff % 60 + '분'}`}</Text> :
                    <Text style={limitTextStyle}>{`점심 주문 마감 시간: 09:30 AM`}</Text>) :
    
                    (this.state.dinnerDiff >= 0 && this.state.dinnerDiff <= 180 ?
                        <Text style={clockTextStyle}>{`저녁 주문 마감까지 남은 시간: ${Math.floor(this.state.dinnerDiff / 60) + '시간 ' + this.state.dinnerDiff % 60 + '분'}`}</Text> :
                        <Text style={limitTextStyle}>{`저녁 주문 마감 시간: 04:00 PM`}</Text>)
                }
            </View>
        );
    }
}

const clockTextStyle = {
    fontFamily: 'S-CoreDream-5Medium',
    fontSize : 14,
    letterSpacing: -0.7,
    color: '#ff0000'
};

const limitTextStyle = {
    fontFamily: "S-CoreDream-4Regular",
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.9,
    color: "#000000"
};