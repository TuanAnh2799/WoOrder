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
        Alert.alert("Thông báo!","Vui lòng kiểm tra lại địa chỉ email.", [
            {
                text: 'Đồng ý',
            },]) 
    }
    
}

export default forgotPassword;
