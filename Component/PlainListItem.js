import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class PlainListItem extends React.Component {

    render(){
        return(
            <TouchableOpacity 
            onPress={this.props.onPress}
            style = {{borderColor : "#f0f0f0", borderTopWidth: 1, borderBottomWidth : 1, paddingTop : "4%", paddingBottom: "4%"}}>
                <Text style = {{marginLeft : "4.4%", fontFamily: "S-CoreDream4", fontSize: 17, 
                fontWeight: "200", fontStyle: "normal",lineHeight: 20, letterSpacing: -0.41,color: "#000000"}}>{this.props.itemTitle}</Text>
            </TouchableOpacity>
        );
        
    }
}
