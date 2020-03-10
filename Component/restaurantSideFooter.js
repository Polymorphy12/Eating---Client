import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ToastAndroid, Text} from 'react-native';
import { Header, Title, Left, Right } from 'native-base';

export default class RestaurantSideFooter extends React.Component {
    render() {
        return(
            <View style = {{flexDirection: 'row', width: '100%', aspectRatio: 360 / 56, borderTopWidth: 1, borderTopColor: '#e4e4e4'}}>
              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.orderBoolean}
                onPress={() => {
                  this.props.navigation.navigate("checkOrder", {ceoID: this.props.ceoID});
                }}>
                <Image
                style={{width:55, height:55}}
                source={this.props.orderBoolean ?
                        require('../assets/images/drawable-hdpi/icon_footer_order_list_activated.png')
                        : require('../assets/images/drawable-hdpi/icon_footer_order_list_deactivated.png')}
                >
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.menuManagementBoolean}
                onPress={() => {
                  this.props.navigation.navigate("menuManagement", {ceoID: this.props.ceoID});
                }}>
                <Image
                  style={{width:55, height:55}}
                  source={this.props.menuManagementBoolean ?
                          require('../assets/images/drawable-hdpi/icon_footer_menu_management_activated.png')
                          : require('../assets/images/drawable-hdpi/icon_footer_menu_management_deactivated.png')}>
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.reviewManagementBoolean}
                onPress={() => {
                  // this.props.navigation.navigate("checkOrder", {ceoID: this.props.ceoID});
                  ToastAndroid.show('현재 지원되지 않는 기능입니다.\n다음 버전을 기다려주세요!', ToastAndroid.SHORT);
                }}>
                <Image
                  style={{width:55, height:55}}
                  source={this.props.reviewManagementBoolean ?
                          require('../assets/images/drawable-hdpi/아이콘_잇힝소식_active.png')
                          : require('../assets/images/drawable-hdpi/아이콘_잇힝소식_disabled.png')}>
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                disabled={this.props.mypageBoolean}
                onPress={() => {
                  // this.props.navigation.navigate("checkOrder", {ceoID: this.props.ceoID});
                  ToastAndroid.show('현재 지원되지 않는 기능입니다.\n다음 버전을 기다려주세요!', ToastAndroid.SHORT);
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