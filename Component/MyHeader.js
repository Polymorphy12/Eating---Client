import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
// import { Header, Title, Left, Right } from 'native-base';

export default class MyHeader extends React.Component {
    render() {
        return(
            // <Header style={styles.header}>
            //     <Left style={styles.headerLeft}>
            //         <TouchableOpacity
            //         onPress={() => {
            //             this.props.navigation.goBack();
            //         }}>
            //             <Image
            //                 style={{width:23, height:23}}
            //                 source={require('../assets/images/drawable-xxxhdpi/아이콘_뒤로가기.png')}
            //                 ></Image>
            //         </TouchableOpacity>
            //     </Left>
            //     <Title style={styles.headerTitle}>{this.props.pageTitle}</Title>
            //     <Right style={styles.headerRight}>
            //     </Right>
            // </Header>

            <View style={{borderBottomWidth: 1, borderBottomColor: '#d6d6d6'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image style={{width: 24, height: 24}}
                                source={require('../assets/images/drawable-xxxhdpi/아이콘_뒤로가기.png')}></Image>
                    </TouchableOpacity>

                    <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 24, letterSpacing: -0.34, color: '#000000'}}>{this.props.pageTitle}</Text>
                    <View style={{width: 24, height: 24}}></View>
                </View>
            </View>
        );
    }
}