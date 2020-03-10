import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class PlainListItem extends React.Component {

    render(){
        return(
            <TouchableOpacity style={{width: '100%', aspectRatio: 360 / 56, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', justifyContent: 'center', paddingHorizontal: 16}}
                                onPress={this.props.onPress}>
                <Text style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 17, letterSpacing: -0.41, color: '#000000'}}>{this.props.itemTitle}</Text>
            </TouchableOpacity>
        );
        
    }
}
