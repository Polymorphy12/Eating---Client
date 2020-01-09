import React from 'react';


export default class RankModal extends React.Component{

    render(){
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor : "#00000080"
                }}>
          <View style = {{width : "75%", height : "75%", backgroundColor: "#fff" }}>
            <TouchableOpacity 
            style = {{width: 24, height : 24}} 
            onPress = {() => {this.setState({isVisible: !this.state.isVisible})}}>
              <Image
              style = {{width: 24, height : 24}}
              source={require('../assets/images/drawable-xxxhdpi/아이콘_닫기.png')}>
              </Image>
            </TouchableOpacity>
            <Text>잇힝 등급</Text>
            <Text>잇힝은 회원님들의 구매 이력에 따른 결과를 등급으로 보여드리고 있습니다 :)</Text>
            <View style = {{flexDirection : 'row'}}>
              <Image
              style = {{width: 60, height : 60}}
              source={require('../assets/images/drawable-xxxhdpi/고객등급_브론즈.png')}>
              </Image>
              <Text>브론즈</Text>
            </View>
            <View style = {{flexDirection : 'row'}}>
              <Image
              style = {{width: 60, height : 60}}
              source={require('../assets/images/drawable-xxxhdpi/고객등급_실버.png')}>
              </Image>
              <Text>실버</Text>
            </View>
            <View style = {{flexDirection : 'row'}}>
              <Image
              style = {{width: 60, height : 60}}
              source={require('../assets/images/drawable-xxxhdpi/고객등급_골드.png')}>
              </Image>
              <Text>골드</Text>
            </View>
            <View style = {{flexDirection : 'row'}}>
              <Image
              style = {{width: 60, height : 60}}
              source={require('../assets/images/drawable-xxxhdpi/고객등급_플래티넘.png')}>
              </Image>
              <Text>플래티넘</Text>
            </View>
              <View style = {{flexDirection : 'row'}}>
              <Image
              style = {{width: 60, height : 60}}
              source={require('../assets/images/drawable-xxxhdpi/고객등급_다이아.png')}>
              </Image>
              <Text>다이아</Text>
            </View>
          </View>
        </View>
        );
    }
}