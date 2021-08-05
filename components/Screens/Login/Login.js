import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Image } from 'react-native'
import Banner from '../../../img/banner.jpg';

const Login = ({navigation}) => {

    const [phone, onChangePhone] = React.useState("");
    const [password, onChangePass] = React.useState("");

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <View style={styles.bannerWrapp}>
                    <Image source={Banner} style={styles.banner}/>
                </View>
                <View style={styles.Input}>
                    <View style={styles.input1}>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangePhone(text)}
                            value={phone}
                            placeholder="Enter your phone number..."
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=> onChangePass(text)}
                            value={password}
                            placeholder="Enter your password..."
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.wrapButton}>
                        <View style={styles.button}>
                            <Button title="Login" onPress={()=>navigation.push('Home')}/>
                            <Text style={{padding: 15, fontSize: 17, textAlign:'center'}}>Need an account?</Text>
                            <Button title="Register" onPress={()=>navigation.navigate('Home')} />
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
        backgroundColor: 'red',
        flex: 2,
    },
    banner: {
        width: '100%',
        height: '100%',
    },
    Input: {
        width: '100%',
        backgroundColor: 'white',
        flex: 3,
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
        paddingTop: 40,
      },
      text: {
          fontSize: 17,
          left: 10,
          marginTop: 3,
      }
});
export default Login;


