import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Platform, Dimensions, SafeAreaView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import changePassword from '../API/forgotPassword'
import PasswordInputText from 'react-native-hide-show-password-input';
import auth, { firebase } from '@react-native-firebase/auth';
import onChangePasswordPress from '../API/changePassword';


const {width, height} = Dimensions.get('window');

const changePasswordScreen = () => {

    const navigation = useNavigation();

    const ChangePassValidSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, ({min}) => `Mật khẩu phải lớn hơn ${min - 1} ký tự`)
      .max(10, ({max}) => `Mật khẩu tối đa ${max} ký tự`)
      .required('Bạn chưa nhập mật khẩu.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường và chữ số.', //(?=.*[!@#\$%\^&\*]) bỏ nhập ký tự
      ),
    newpassword: Yup.string()
      .min(6, ({min}) => `Mật khẩu phải lớn hơn ${min - 1} ký tự`)
      .max(10, ({max}) => `Mật khẩu tối đa ${max} ký tự`)
      .required('Bạn chưa nhập mật khẩu.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường và chữ số.', //(?=.*[!@#\$%\^&\*]) bỏ nhập ký tự
      ),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('newpassword')], 'Mật khẩu không khớp')
      .required('Bạn chưa nhập lại mật khẩu'),
         //(?=.*[!@#\$%\^&\*]) bỏ phải nhập ký tự #009387#1c1c1c1c
      });

    // reauthenticate = (currentPassword) => {
    //     var user = auth().currentUser;
    //     var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    //     return user.reauthenticateWithCredential(cred);
    // }

    // onChangePasswordPress = (password,newpassword) => {
    //     this.reauthenticate(password).then(() => {
    //       var user = firebase.auth().currentUser;
    //       user.updatePassword(newpassword).then(() => {
    //         Alert.alert("Đổi mật khẩu thành công!");
    //       }).catch((error) => { console.log(error.message); Alert.alert("Thất bại! Vui lòng kiểm tra lại.");});
    //     }).catch((error) => {Alert.alert("Mật khẩu cũ không chính xác."); console.log(error.message) });
    //   }

    return (
        <SafeAreaView style={styles.wrapForgetPass}>
            <Formik
                validationSchema={ChangePassValidSchema}
                initialValues={{password: '', newpassword:'', confirmPassword: ''}}
                validateOnMount={true}
                onSubmit={values => console.log(values)}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                  }) => (
                <View style={{width:'90%', height: height *0.35, backgroundColor:'#fff', borderRadius: 20, borderWidth: 0.5 , borderColor:'#1c1c1c', shadowColor:'black', elevation: 5,}}>
                    <View>
                        <Text style={styles.text}>Mật khẩu cũ</Text>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <View style={{marginTop: 12, marginLeft: 15, justifyContent:'center', alignItems:'center'}}>
                                <FontAwesome name="lock" color="#05375a" size={24} />
                            </View>
                                <PasswordInputText
                                style={styles.textInputPass}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Nhập mật khẩu cũ..."
                                secureTextEntry={true}
                                label=''
                            />
                        </View>

                        {errors.password && touched.password && (
                        <Text style={{fontSize: 14, color: 'red', marginLeft: '10%'}}>
                            {errors.password}
                        </Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.text}>Mật khẩu mới</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.wrapIcon}>
                                <FontAwesome name="lock" color="#05375a" size={24} />
                            </View>

                            <PasswordInputText
                                style={styles.textInputPass}
                                onChangeText={handleChange('newpassword')}
                                onBlur={handleBlur('newpassword')}
                                value={values.newpassword}
                                placeholder="Nhập mật khẩu mới..."
                                secureTextEntry={true}
                                label=''
                            />
                        </View>

                        {errors.newpassword && touched.newpassword && (
                        <Text style={{fontSize: 14, color: 'red', marginLeft: '10%'}}>
                            {errors.newpassword}
                        </Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.text}>Nhập lại mật khẩu mới</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.wrapIcon}>
                                <FontAwesome name="lock" color="#05375a" size={24} />
                            </View>

                            <PasswordInputText
                                style={styles.textInputPass}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                placeholder="Nhập lại mật khẩu..."
                                secureTextEntry={true}
                                label=''
                            />
                        </View>

                        {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={{fontSize: 14, color: 'red', marginLeft: '10%'}}>
                            {errors.confirmPassword}
                        </Text>
                        )}
                    </View>
                   
                    <View style={{marginTop: 30, width:'100%', alignItems:'center'}}>
                        <View style={{width:'50%'}}>
                            <Button  title='Thay đổi' disabled={!isValid} onPress={()=> {
                                //forgotPassword(values.email);
                                Alert.alert("Xác nhận","Bạn chắc chắn muốn đổi?", [
                                {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                        onChangePasswordPress(values.password,values.newpassword);
                                    },
                                },
                                {
                                    text: 'Hủy',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                ])
                            }}/>
                        </View>
                    </View>
                </View>
            )}
            </Formik>
        </SafeAreaView>
    )
}

export default changePasswordScreen;

const styles = StyleSheet.create({
    wrapForgetPass: {
        flex: 1,
        backgroundColor:'#fff',
        justifyContent:'center', alignItems:'center'
    },
    textInputPass: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        width: '85%',
      },
    text: {
        fontSize: 16,
        left: 15,
        marginTop: 20,
      },
    wrapIcon: {
        marginTop: 15,
        marginLeft: 15,
        justifyContent:'center',
        alignItems:'center'
    },
})
