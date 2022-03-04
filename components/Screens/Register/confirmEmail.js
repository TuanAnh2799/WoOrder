import { SafeAreaView, StyleSheet, Text, View, Linking, Button, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react';
import { firebase } from '@react-native-firebase/auth';

const linkEmail = 'https://mail.google.com/mail';

const ConfirmEmailScreen = ({navigation}) => {

    // var user = firebase.auth().currentUser;

    // console.log('user curent confirm:', user);

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return (
            <TouchableOpacity style={{width: '45%', height: 42, alignItems:'center',backgroundColor:'orange', borderRadius: 30}} onPress={handlePress}>
                <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize: 16}}>{children}</Text>
                </View>
            </TouchableOpacity>
            
        )
        // <Button title={children} onPress={handlePress} />;
      };

  return (
    <SafeAreaView style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width: '100%', justifyContent:'center', alignItems:'center', marginBottom: 30}}>
            <View style={{width: '90%', alignItems:'center'}}>
                <Text style={{textAlign:'center', fontSize: 18}}>
                    Vui lòng truy cập gmail để xác minh hoặc bấm vào <Text style={{fontSize: 20}}>" Xác minh ngay "</Text>.
                </Text>
            </View>
        </View>
        
        <OpenURLButton url={linkEmail}>Xác minh ngay</OpenURLButton>

        <View style={{marginTop: 30}}>
            <Text style={{fontSize: 16}}>Đã xác nhận tài khoản?</Text>
        </View>

        <View style={{width: '100%', height: 42, alignItems:'center', borderRadius: 30, marginTop: 35}}>
            <TouchableOpacity style={{width: '45%', height: 42, alignItems:'center',backgroundColor:'orange', borderRadius: 30}} onPress={()=> navigation.navigate('Login')}>
                <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'black', fontSize: 16}}>Về trang đăng nhập</Text>
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ConfirmEmailScreen;

const styles = StyleSheet.create({})