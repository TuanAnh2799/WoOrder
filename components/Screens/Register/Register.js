import React,{useContext,useState, useEffect} from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Image,TextInput, Alert } from 'react-native';
import Banner from '../../../img/banner.jpg';
import { AuthContext } from '../../Routes/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegisterScreen({navigation}) {

    const {register} = useContext(AuthContext);

    const [username, onChangeUserName] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePass] = useState("");
    const [confirmPassword, onChangeconfirmPassword] = useState("");

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <View style={styles.bannerWrapp}>
                    <Image source={Banner} style={styles.banner}/>
                </View>
                
                <View style={styles.Input}>
                    <View style={{marginTop: 35}}>
                        <Text style={styles.text}>Tên tài khoản</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangeUserName(text)}
                            value={username}
                            placeholder="Tên tài khoản..."
                        />
                    </View>
                    <View style={styles.input1}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangeEmail(text)}
                            value={email}
                            placeholder="Nhập email..."
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangePass(text)}
                            value={password}
                            placeholder="Nhập mật khẩu..."
                            secureTextEntry={true}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Nhập lại mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangeconfirmPassword(text)}
                            value={confirmPassword}
                            placeholder="Nhập lại mật khẩu..."
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.wrapButton}>
                        <View style={styles.button}>
                            <Button title="Đăng ký" onPress={() => 
                                register(email, password,username)
                                }/>
                            <Text style={{padding: 15, fontSize: 17, textAlign:'center'}}>Đã có tài khoản?</Text>
                            <Button title="Đăng nhập" onPress={()=>navigation.navigate("Login")} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    bannerWrapp: {
        width: '100%',
        flex: 2,
    },
    banner: {
        width: '100%',
        height: '100%',
    },
    Input: {
        width: '100%',
        backgroundColor: 'white',
        flex: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -25,
    },
    wrapButton:{
        flex: 1,
        backgroundColor: 'white',
        top: 30,
    },
    button: {
        width: '90%',
        marginLeft: '5%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
    },
    input1:{
        paddingTop: 4,
    },
    text: {
        fontSize: 17,
        left: 10,
        marginTop: 3,
    }
});
