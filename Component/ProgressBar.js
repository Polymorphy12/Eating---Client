import React from 'react';
import { View, ProgressBarAndroid } from 'react-native';

export default class ProgressBar extends React.Component {

    render() {
        var progress = this.props.progress;
        var dotColor = [];
        for(var i = 0; i < 6; i++) {
            if(i <= progress) dotColor[i] = "black";
            else dotColor[i] = "#cccccc";
        }

        return (
            <View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ProgressBarAndroid
                        styleAttr="Horizontal"
                        color="black"
                        indeterminate={false}
                        progress={progress / 5}
                        style={{width: "74.4%", height: 100}}
                    />
                    <View style={{width: "100%", height: 8, alignItems: "center", top: -54.3}}>
                        <View style={{width: "76%", height: 8, display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[0], borderRadius: 20}}></View>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[1], borderRadius: 20}}></View>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[2], borderRadius: 20}}></View>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[3], borderRadius: 20}}></View>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[4], borderRadius: 20}}></View>
                            <View style={{width: 8, height: 8, backgroundColor: dotColor[5], borderRadius: 20}}></View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}