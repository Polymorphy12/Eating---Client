import React, { Component } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class OrderHistoryDetails extends Component {
    state = {
        menuPrice : 2500,
        menuAmount : 1,
        totalPrice : 2500

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
            <View style = {navBar}>
              <Text style={titleText}>상세주문내역</Text>
            </View>
            
            <ScrollView contentContainerStyle = {totalContainer}>
              {/* 메뉴 컨테이너 */}
              <View style={menuContainer}>
                <Image style={{
                  width: 106, 
                  height : 112}}
                  source={require('../assets/images/drawable-hdpi/메뉴_더블치즈제육.png')}
                  > 
                </Image>
                <Text style={menuName}>햄밥버거</Text>
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
              {/* <View style={buttonContainer}>
                <TouchableOpacity style={navToBasketButton}
                  onPress={() => {
                    navigation.navigate("shoppingCart");
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
              </View> */}
            </ScrollView>
            
        
            <View style = {footer}>
              <TouchableOpacity style = {footerBox}>
                <Text>Menu</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {footerBox}>
                <Text>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {footerBox}>
                <Text>History</Text>
              </TouchableOpacity>
            </View>
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