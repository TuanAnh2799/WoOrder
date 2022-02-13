import auth from '@react-native-firebase/auth';
import {Alert } from 'react-native';

const forgotPassword = async(email)=> {
    try {
       await auth().sendPasswordResetEmail(email).then(()=>{
            Alert.alert("Thành công!","Hãy kiểm tra hòm thư email của bạn!", [
            {
                text: 'Đồng ý',
                onPress: () => {
                navigation.navigate('Login');
                },
            },]);
       });
    } catch (error) {
        Alert.alert("Thông báo!","Email không tồn tại, vui lòng kiểm tra lại.", [
            {
                text: 'Đồng ý',
            },]) 
    }
    
}

export default forgotPassword;
