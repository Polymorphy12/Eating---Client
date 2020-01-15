import React, {Component} from 'react';
import { View } from 'react-native';

export default class CutLine extends Component {
    render() {
        return(
            <View style={cutLineWhiteStyle}>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
                <View style={cutLineBlackStyle}></View>
            </View>
        );
    }
}

const cutLineWhiteStyle = {
    width: '100%',
    height: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '0.9%',
    marginBottom: '1.7%'
};
  
const cutLineBlackStyle = {
    width: '3%',
    height: 2,
    backgroundColor: '#000000'
};