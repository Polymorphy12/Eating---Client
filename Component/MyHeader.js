import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Header, Title, Left, Right } from 'native-base';

export default class MyHeader extends React.Component {
    render() {
        return(
            <Header style={styles.header}>
                <Left style={styles.headerLeft}>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Image
                        style={{width:23, height:23}}
                        source={require('../assets/images/drawable-xxxhdpi/아이콘_뒤로가기.png')}
                        >
                    </Image>
                    </TouchableOpacity>
                </Left>
                <Title style={styles.headerTitle}>{this.props.pageTitle}</Title>
                <Right style={styles.headerRight}>
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {height: 65, paddingHorizontal: 16, flexDirection: "row", backgroundColor: "white", alignItems:'center', justifyContent:'center', borderBottomWidth: 1, borderBottomColor: '#d6d6d6'},
    headerLeft: {flex: 1},
    headerRight: {flex: 1},
    headerTitle: {flex: 1, color: "black", alignItems: 'center', justifyContent: 'center', paddingTop: 7},
});