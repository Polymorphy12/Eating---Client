import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OrderHeader from "../Component/OrderHeader";
import MyFooter from "../Component/MyFooter";

export default class MenuDetails extends Component {
    
  constructor(props) {
    super(props)
    this.state = { 
      progress: 1, 
      empty: false, 
      buttonColor: "#fadee2", 
      pageTitle: "메뉴 상세", 
      username : props.navigation.getParam('username', ""),
      restaurant_name: props.navigation.getParam('restaurant_name', '봉구스밥버거'),
      menuPrice : props.navigation.getParam('menu_price', 2500),
      menuAmount : 1,
      totalPrice : props.navigation.getParam('menu_price', 2500),
      menuName : props.navigation.getParam('menu_name', '더블치즈제육'),
      menuImage : props.navigation.getParam('menu_image', "")
    }

    console.log(this.state.restaurant_name);
    
  }
  
      handleIncrease = () => {
        this.setState({
          menuAmount : this.state.menuAmount+1,
          totalPrice : this.state.menuPrice * (this.state.menuAmount+1)
        });
      }

      handleDecrease = () => {
        if(this.state.menuAmount > 1)
        {
          this.setState({
            menuAmount : this.state.menuAmount-1,
            totalPrice : this.state.menuPrice * (this.state.menuAmount-1)
          });
        }
      }

      render() {

        const {navigation } = this.props;

        return (
          <View
            style= {{
              flex: 1
            }}
          >
            <OrderHeader 
            navigation={this.props.navigation} 
            pageTitle={this.state.pageTitle}
            username={this.state.username}></OrderHeader>
            
            <ScrollView contentContainerStyle = {totalContainer}>
              {/* 메뉴 컨테이너 */}
              <View style={menuContainer}>
                <Image style={{
                  width: 106, 
                  height : 112}}
                  source={{uri: 'http://13.124.193.165:3000/static/' + this.state.menuImage}}
                  > 
                </Image>
                <Text style={menuName}>{this.state.menuName}</Text>
              </View>


              {/* 가격 컨테이너 */}
              <View style={priceContainer}>
                <Text style = {detailsText}>가격</Text>
                <Text style={priceText}>{this.state.menuPrice}원</Text>
              </View>
              
              
              {/* 수량 컨테이너 */}
              <View style={amountContainer}>
                <Text style={detailsText}>수량</Text>
                <View style = {plusMinusContainer}>
                  <TouchableOpacity style={plusMinusButton}
                  onPress={this.handleDecrease}
                  >
                    <Text style={plusMinusButtonText}>-</Text>
                  </TouchableOpacity>
                  <View style={amountView}>
                    <Text style={detailsText}>{this.state.menuAmount}</Text>
                  </View>
                  <TouchableOpacity style={plusMinusButton}
                  onPress={this.handleIncrease}>
                    <Text style={plusMinusButtonText}>+</Text> 
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={finalPriceText}>총 주문 금액</Text>
              <Text style={finalPrice}>{this.state.totalPrice} 원</Text>

              {/* 버튼 컨테이너 */}
              <View style={buttonContainer}>
                <TouchableOpacity style={navToBasketButton}
                  onPress={() => {
                    navigation.navigate("shoppingCart", 
                    {username : this.state.username, menu_name : this.state.menuName, menu_amount : this.state.menuAmount, restaurant_name : this.state.restaurant_name});
                }}
                >
                  <Text style={navText}>장바구니에 담기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={goBackButton}
                  onPress={() => {
                    navigation.goBack(null)
                  }}
                >
                  <Text style={navText}>계속 둘러보기</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            
        
            <MyFooter navigation={this.props.navigation}></MyFooter>
          </View>
        );
      }
}

const titleText = {
  fontFamily: "AppleSDGothicNeo",
  fontSize: 23,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: -0.24,
  textAlign: "center",
  color: "#000"
};

const totalContainer = {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
}

const plusMinusContainer = {
  marginLeft : 100,
  flexDirection: 'row',
  alignItems: 'center',
}


const menuContainer = {
  marginBottom: 41
}

const priceContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  margin: 22
}

const amountContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  margin: 22
}

const buttonContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  margin: 20
}

const plusMinusButton = {
  width: 40,
  height: 40,
  backgroundColor: "#fff",
  borderStyle: "solid",
  borderWidth: 0.5,
  borderColor: "#979797",
  alignItems: "center",
  justifyContent: "center",
}

const plusMinusButtonText = {

}

const amountView = {
  width: 80,
  height: 40,
  backgroundColor: "#fff",
  borderStyle: "solid",
  borderWidth: 0.5,
  borderColor: "#979797",
  alignItems: "center",
  justifyContent: "center"
}

const navToBasketButton = {
  width: 160,
  height: 40,
  borderRadius: 32,
  backgroundColor: "#ff1d30",
  alignItems: "center",
  justifyContent: "center",
  margin: 4
}

const navText = {
  fontFamily: "S-CoreDream-8",
  fontSize: 13,
  fontWeight: "900",
  fontStyle: "normal",
  letterSpacing: 0.85,
  textAlign: "center",
  color: "#fff"
}

const goBackButton = {
  width: 160,
  height: 40,
  borderRadius: 32,
  backgroundColor: "#9b9b9b",
  alignItems: "center",
  justifyContent: "center",
  margin: 4
}

const finalPrice = {
  fontFamily: "S-CoreDream-7",
  fontSize: 32,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: 2.09,
  textAlign: "center",
  color: "#ff1d30"
}

const finalPriceText = {
  fontFamily: "S-CoreDream-7",
  fontSize: 15,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: 0.98,
  textAlign: "center",
  color: "#000",
  margin: 22
}

const menuName ={
  fontFamily: "S-CoreDream-5",
  fontSize: 19,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 1.24,
  textAlign: "center",
  color: "#000"
}

const detailsText ={
  fontFamily: "S-CoreDream-7",
  fontSize: 20,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: 1.31,
  textAlign: "center",
  color: "#000"
}

const priceText = {
  fontFamily: "S-CoreDream-7",
  fontSize: 20,
  fontWeight: "800",
  fontStyle: "normal",
  letterSpacing: 1.31,
  textAlign: "center",
  color: "#000",
  marginLeft: 184 
}

const navBar = {
  height: 70,
  //opacity: 0.51,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ff1d30"
};


const footer ={
  height: 70,
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