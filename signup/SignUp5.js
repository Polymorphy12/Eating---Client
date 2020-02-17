import React from 'react';
import { TouchableOpacity, SafeAreaView, Button, View, Text, TextInput , ProgressBarAndroid, Image, StyleSheet, ToastAndroid} from 'react-native';
import { Container, Header,  Body,  Title, Left, Right, CheckBox } from 'native-base';
import MyHeader from '../Component/MyHeader';
import ProgressBar from '../Component/ProgressBar';
import axios from 'axios';

export default class SignUp5 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 4,
            emailFilled: false,
            pswdFilled: false,
            repswdFilled: false,
            emailAuthBool: false,
            pageTitle: "회원가입",
            _userName: props.navigation.getParam('userName'),
            optionalCheckBoxChecked: props.navigation.getParam('optionalCheckBoxChecked'),
            phoneNum: props.navigation.getParam('phoneNum'),
        }
    }

    onEmailFill = (text) => {
        if (text !== '') this.setState({emailFilled: true});
        else this.setState({emailFilled: false});
    }

    onPswdFill = (text) => {
        if (text !== '') this.setState({pswdFilled: true});
        else this.setState({pswdFilled: false});
    }

    onRepswdFill = (text) => {
        if (text !== '') this.setState({repswdFilled: true});
        else this.setState({repswdFilled: false});
    }

    regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    render() {
        const removeEmojis = (string) => {
            // emoji regex from the emoji-regex library
            const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
          
            return string.replace(regex, '');
        }

        return (
            <SafeAreaView style={styles.fullscreen}>
                
                <MyHeader navigation={this.props.navigation} pageTitle={this.state.pageTitle}></MyHeader>
                <View style={{flex: 1, marginHorizontal: 16}}>
                    <ProgressBar progress={this.state.progress}></ProgressBar>

                    <Text
                        style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderBottomColor: 'gray'}}
                    >이메일을 입력해주세요.</Text>

                    <Text
                        style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 12, letterSpacing: -0.17, color: '#9b9b9b', marginTop: 12}}
                    >로그인과 회원가입에 필요합니다.</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14}}>
                        <TextInput
                            style={{width: '50%', fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0}}
                            onChangeText={userEmail => {
                                this.state.emailAuthBool = false;
                                this.setState({userEmail});
                                this.onEmailFill(userEmail);
                            }}
                            maxLength={40}
                            keyboardType={'email-address'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { this.authTextInput.focus(); }}
                            blurOnSubmit={false}
                            placeholder={'welcome@eating.com'}
                            placeholderTextColor={'#d2d2d2'}
                        />

                        <TouchableOpacity style={{width: 92, height:28, alignItems:"center", justifyContent: 'center', borderRadius: 5, backgroundColor: "#ed6578"}}
                                            onPress={() => {
                                                if(!this.state.userEmail)
                                                {
                                                    //이거 없다는 알림 + 진행 종료하는 로직
                                                    ToastAndroid.show('이메일을 입력해 주세요.', ToastAndroid.SHORT);
                                                    return;
                                                }
                                                if(!this.state.userEmail.match(this.regExp))
                                                {
                                                    ToastAndroid.show('잘못된 이메일 형식입니다.', ToastAndroid.SHORT);
                                                    return;
                                                }

                                                axios.post('http://13.124.193.165:3000/emailAuth/signUpEmailAuth', {
                                                    params: {
                                                        userEmail : this.state.userEmail,
                                                    }
                                                }).then(response => {
                                                    ToastAndroid.show(response.data, ToastAndroid.SHORT);
                                                }).catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    throw error;
                                                });
                                            }}
                                            activeOpacity={0.8}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, lineHeight: 22, letterSpacing: -1.5, color: '#ffffff', marginHorizontal: 6}}>인증번호 받기</Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderBottomColor: 'gray', marginTop: 42}}
                    >이메일 인증번호를 입력해주세요.</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14}}>
                        <TextInput
                            style={{width: '50%', fontFamily: 'S-CoreDream4-ExtraLight', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0}}
                            onChangeText={emailAuthText => {
                                this.setState({emailAuthText});
                            }}
                            maxLength={6}
                            keyboardType={'number-pad'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                            blurOnSubmit={false}
                            ref={(input) => { this.authTextInput = input; }}
                            placeholder={'245352'}
                            placeholderTextColor={'#d2d2d2'}
                        />

                        <TouchableOpacity style={{width: 92, height:28, alignItems:"center", justifyContent: 'center', borderRadius: 5, backgroundColor: "#ed6578"}}
                                            onPress={() => {
                                                if(!this.state.emailAuthText)
                                                {
                                                    ToastAndroid.show('인증번호를 입력해 주세요.', ToastAndroid.SHORT);
                                                    return;
                                                }

                                                axios.post('http://13.124.193.165:3000/emailAuth/signUpEmailAuthCheck', {
                                                    params: {
                                                        userEmail : this.state.userEmail,
                                                        emailAuthText: this.state.emailAuthText,
                                                    }
                                                }).then(response => {
                                                    if (response.data === -1)       ToastAndroid.show('시스템에 문제가 생겼습니다. 고객센터에 문의해주세요.', ToastAndroid.SHORT);
                                                    else if (response.data === 0)   ToastAndroid.show('잘못된 인증번호입니다.', ToastAndroid.SHORT);
                                                    else if (response.data === 1) {
                                                        ToastAndroid.show('이메일 인증에 성공했습니다.', ToastAndroid.SHORT);
                                                        this.setState({emailAuthBool: true});
                                                    }
                                                }).catch(function(error) {
                                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                                    throw error;
                                                });
                                            }}
                                            activeOpacity={0.8}>
                            <Text style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 14, lineHeight: 22, letterSpacing: -1.5, color: '#ffffff', marginHorizontal: 6}}>확인하기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "100%", marginTop: 42}}>
                        <Text
                            style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderBottomColor: 'gray'}}
                        >비밀번호를 입력해 주세요.</Text>

                        <TextInput
                            style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0, marginTop: 20}}
                            secureTextEntry = {true}
                            onChangeText={pass_word => {
                                this.setState({pass_word});
                                this.onPswdFill(pass_word);}}
                            maxLength={20}
                            returnKeyType={'next'}
                            onSubmitEditing={() => { this.passwordCheckTextInput.focus(); }}
                            blurOnSubmit={false}
                            ref={(input) => { this.passwordTextInput = input; }}
                            placeholder={"영문 숫자 조합 8자리 이상 입력해 주세요."}
                            placeholderTextColor={'#d2d2d2'}
                        />
                    </View>

                    <View style={{width: "100%", marginTop: 42}}>
                        <Text
                            style={{fontFamily: 'S-CoreDream-5Medium', fontSize: 20, letterSpacing: -0.28, color: '#030303', borderBottomWidth: 1, borderBottomColor: 'gray'}}
                        >비밀번호를 재입력해 주세요.</Text>
                        <TextInput
                            style={{fontFamily: 'S-CoreDream-4Regular', fontSize: 16, letterSpacing: -0.23, color: '#6e6e6e', padding: 0, marginTop: 20}}
                            secureTextEntry = {true}
                            onChangeText={pass_word_check => {
                                this.setState({pass_word_check});
                                this.onRepswdFill(pass_word_check);}}
                            maxLength={20}
                            ref={(input) => { this.passwordCheckTextInput = input; }}
                            placeholder={"영문 숫자 조합 8자리 이상 입력해 주세요."}
                            placeholderTextColor={'#d2d2d2'}
                        />
                    </View>

                    <View style={{flex: 1, width: "100%", alignItems:"center", justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={{width: "84.4%", height: 48, alignItems: "center", justifyContent: 'center', borderRadius: 50, backgroundColor: (this.state.emailFilled && this.state.pswdFilled && this.state.repswdFilled) ? '#ed6578' : '#fadee2', marginBottom: 60}}
                            onPress={() => {
                                if(!this.state.userEmail)
                                {
                                    //이거 없다는 알림 + 진행 종료하는 로직
                                    ToastAndroid.show('이메일을 입력해 주세요.', ToastAndroid.SHORT);
                                    return;
                                }
                                else if(!this.state.pass_word)
                                {
                                    //이거 없다는 알림 + 진행 종료하는 로직
                                    ToastAndroid.show('비밀번호를 입력해 주세요.', ToastAndroid.SHORT);
                                    return;
                                }
                                else if(!this.state.pass_word_check)
                                {
                                    //이거 없다는 알림 + 진행 종료하는 로직
                                    ToastAndroid.show('비밀번호를 재입력해 주세요.', ToastAndroid.SHORT);
                                    return;
                                }
                                else if(!this.state.emailAuthBool) {
                                    ToastAndroid.show('이메일이 인증되지 않았습니다.', ToastAndroid.SHORT);
                                    return;
                                }

                                axios.post('http://13.124.193.165:3000/users' ,{
                                    params: {
                                        userEmail : this.state.userEmail,
                                        password : this.state.pass_word,
                                        passwordCheck : this.state.pass_word_check,
                                        userName: this.state._userName,
                                        optionalCheckBoxChecked: this.state.optionalCheckBoxChecked,
                                        phoneNum: this.state.phoneNum,
                                    }
                                }).then(response => {
                                    if(response.data === true) this.props.navigation.navigate('signUp6');
                                    else ToastAndroid.show(response.data, ToastAndroid.SHORT);
                                }).catch((error) => {
                                    console.log('There has been a problem with your fetch operation: ' + error.message);
                                    // ADD THIS THROW error
                                    throw error;
                                });

                                /*
                                axios.post('http://13.124.193.165:3000/users', {
                                        params: {
                                            username : this.state.userEmail,
                                            password : this.state.pass_word,
                                            passwordCheck : this.state.pass_word_check
                                        }
                                    })
                                        .then(response => {
                                            ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                                        })
                                        .catch(function(error) {
                                            console.log('There has been a problem with your fetch operation: ' + error.message);
                                        // ADD THIS THROW error
                                        throw error;
                                        });
                                
                                //this.props.navigation.navigate('signUp6');
                                */
                            }}
                            activeOpacity={0.8}
                            disabled={!this.state.emailFilled || !this.state.pswdFilled || !this.state.repswdFilled}>
                            <Text style={{fontFamily: 'S-CoreDream-6Bold', fontSize: 20, color: '#ffffff'}}>다음으로</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {width: "100%", height: "100%", flex: 1},
});