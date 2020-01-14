import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ToastAndroid} from 'react-native';
import { Header, Title, Left, Right } from 'native-base';

export default class MyFooter extends React.Component {
    render() {
        return(
            <View style = {footer}>
              <TouchableOpacity style = {footerBox}
                onPress={() => {
                  ToastAndroid.show(JSON.stringify(this.props.navigation), ToastAndroid.SHORT);
                  this.props.navigation.navigate("SelectRestaurant");
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

              <TouchableOpacity style = {footerBox}
              onPress={() => {
                this.props.navigation.navigate("haktalNews");
                console.log(this.props);
              }}>
                <Image
                  style={{width:55, height:55}}
                  source={this.props.newsBoolean ?
                          require('../assets/images/drawable-hdpi/아이콘_학탈소식_active.png')
                          : require('../assets/images/drawable-hdpi/아이콘_학탈소식_disabled.png')}>
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style = {footerBox}
              onPress={() => {
                this.props.navigation.navigate("mypage");
                console.log(this.props);
              }}>
              <Image
                style={{width:55, height:55}}
                source={this.props.mypageBoolean ?
                        require('../assets/images/drawable-hdpi/아이콘_마이학탈_active.png')
                        :require('../assets/images/drawable-hdpi/아이콘_마이학탈_disabled.png')}>
              </Image>
              </TouchableOpacity>
            </View>        
            );
    }
}

const styles = StyleSheet.create({
    header: {height: 43, flexDirection: "row", backgroundColor: "white"},
    headerLeft: {flex: 1},
    headerRight: {flex: 1},
    headerTitle: {flex: 1, color: "black", alignItems: 'center', justifyContent: 'center', paddingTop: 7},
});

const footer ={
    height: 80,
    backgroundColor: "rgba(248, 248, 248, 0.98)",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  }
  
  const footerBox ={
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 89.3,
    height: 40,
    backgroundColor: "rgba(185, 202, 210, 0)"
  }

/*

*/