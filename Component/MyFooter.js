import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ToastAndroid, Text} from 'react-native';
import { Header, Title, Left, Right } from 'native-base';

export default class MyFooter extends React.Component {
    render() {
        return(
            <View style = {{flexDirection: 'row', width: '100%', aspectRatio: 360 / 56, borderTopWidth: 1, borderTopColor: '#e4e4e4'}}>
              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.orderBoolean}
                onPress={() => {
                  //ToastAndroid.show(JSON.stringify(this.props.navigation), ToastAndroid.SHORT);
                  this.props.navigation.navigate("SelectRestaurant", {userEmail: this.props.userEmail});
                  console.log(this.props);
                }}>
                <Image
                style={{width:55, height:55}}
                source={this.props.orderBoolean ?
                        require('../assets/images/drawable-hdpi/아이콘_주문하기_active.png')
                        : require('../assets/images/drawable-hdpi/아이콘_주문하기_disabled.png')}
                >
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.newsBoolean}
                onPress={() => {
                  this.props.navigation.navigate("haktalNews", {userEmail: this.props.userEmail});
                  console.log(this.props);
                }}>
                <Image
                  style={{width:55, height:55}}
                  source={this.props.newsBoolean ?
                          require('../assets/images/drawable-hdpi/아이콘_잇힝소식_active.png')
                          : require('../assets/images/drawable-hdpi/아이콘_잇힝소식_disabled.png')}>
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.mypageBoolean}
                onPress={() => {
                  this.props.navigation.navigate("mypage", {userEmail: this.props.userEmail});
                  console.log(this.props);
                }}>
                <Image
                  style={{width:55, height:55}}
                  source={this.props.mypageBoolean ?
                          require('../assets/images/drawable-hdpi/아이콘_마이페이지_active.png')
                          :require('../assets/images/drawable-hdpi/아이콘_마이페이지_disabled.png')}>
                </Image>
              </TouchableOpacity>
            </View>        
            );
    }
}