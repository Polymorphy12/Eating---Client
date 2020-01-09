import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Row } from 'native-base';

export default class MyPageListItem extends React.Component {

    render(){
        if(this.props.contact == "kakao"){
            return(
                <TouchableOpacity 
                onPress={this.props.onPress}
                style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}>
                    <Image
                    style = {{marginLeft : "4.4%", width: 24, height : 24}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_카카오톡.png')}></Image>
                    <Text style = {{marginLeft : "4.4%", fontFamily: "S-CoreDream4", fontSize: 15, 
                    fontWeight: "200", fontStyle: "normal",lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{this.props.itemTitle}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.contact == "instagram"){
            return(
                <TouchableOpacity 
                onPress={this.props.onPress}
                style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}>
                    <Image
                    style = {{marginLeft : "4.4%", width: 24, height : 24}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_인스타그램.png')}></Image>
                    <Text style = {{marginLeft : "4.4%", fontFamily: "S-CoreDream4", fontSize: 15, 
                    fontWeight: "200", fontStyle: "normal",lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{this.props.itemTitle}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.contact == "e-mail"){
            return(
                <TouchableOpacity 
                onPress={this.props.onPress}
                style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}>
                    <Image
                    style = {{marginLeft : "4.4%", width: 24, height : 24}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_이메일.png')}></Image>
                    <Text style = {{marginLeft : "4.4%", fontFamily: "S-CoreDream4", fontSize: 15, 
                    fontWeight: "200", fontStyle: "normal",lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{this.props.itemTitle}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.contact == "facebook"){
            return(
                <TouchableOpacity 
                onPress={this.props.onPress}
                style = {{flexDirection: 'row', borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}>
                    <Image
                    style = {{marginLeft : "4.4%", width: 24, height : 24}}
                    source={require('../assets/images/drawable-xxxhdpi/아이콘_페이스북.png')}></Image>
                    <Text style = {{marginLeft : "4.4%", fontFamily: "S-CoreDream4", fontSize: 15, 
                    fontWeight: "200", fontStyle: "normal",lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{this.props.itemTitle}</Text>
                </TouchableOpacity>
            );
        }
        
    }
}
