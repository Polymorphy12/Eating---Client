import React, {Component} from 'react';
import { View, Image } from 'react-native';

export default class ShoppingCartProgressBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <View style={{height: 1.5, marginHorizontal: '12%', backgroundColor: '#686868'}}></View>
                <View style={{marginHorizontal: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={{width: 13, height: 13, backgroundColor: this.props.progress === 0 ? '#ffffff' : '#686868', borderRadius: 40, borderWidth: 2, borderColor: this.props.progress === 0 ? '#ed6578' : '#ffffff', top: -7,}}></View>
                        <Image source={require('../assets/images/drawable-xxxhdpi/아이콘_구매리스트.png')}></Image>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: 13, height: 13, backgroundColor: this.props.progress === 1 ? '#ffffff' : '#686868', borderRadius: 40, borderWidth: 2, borderColor: this.props.progress === 1 ? '#ed6578' : '#ffffff', top: -7,}}></View>
                        <Image source={require('../assets/images/drawable-xxxhdpi/아이콘_배달장소.png')}></Image>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: 13, height: 13, backgroundColor: this.props.progress === 2 ? '#ffffff' : '#686868', borderRadius: 40, borderWidth: 2, borderColor: this.props.progress === 2 ? '#ed6578' : '#ffffff', top: -7,}}></View>
                        <Image source={require('../assets/images/drawable-xxxhdpi/아이콘_주문내역.png')}></Image>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: 13, height: 13, backgroundColor: this.props.progress === 3 ? '#ffffff' : '#686868', borderRadius: 40, borderWidth: 2, borderColor: this.props.progress === 3 ? '#ed6578' : '#ffffff', top: -7,}}></View>
                        <Image source={require('../assets/images/drawable-xxxhdpi/아이콘_주문확인.png')}></Image>
                    </View>
                </View>
            </View>
        );
    }
}
