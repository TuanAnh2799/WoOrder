import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import forgotPassword from '../API/forgotPassword';


export default function ForgotPasswordScreen (){
    const navigation = useNavigation();

    const ForgetValidSchema = Yup.object().shape({
        email: Yup.string()
          .email('Vui lòng nhập địa chỉ email')
          .required('Bạn chưa nhập địa chỉ email.'),
         //(?=.*[!@#\$%\^&\*]) bỏ phải nhập ký tự #009387#1c1c1c1c
      });



    return(

        <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <Formik
                validationSchema={ForgetValidSchema}
                initialValues={{email: ''}}
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
                <View style={{width:'80%', height:'35%', backgroundColor:'#fff', borderRadius: 20, borderWidth: 0.5 , borderColor:'#1c1c1c', shadowColor:'black', elevation: 5, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom: 20, fontSize: 16}}>Nhập email của bạn để lấy lại mật khẩu</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View
                            style={{
                            width: '10%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <FontAwesome name="envelope" color="#05375a" size={20} />
                        </View>
                        <View style={{width: '85%',borderRadius: 10, backgroundColor: 'white', height: 40, borderColor: 'black', borderWidth: 0.5,}}>
                            <TextInput
                                placeholder="Nhập email ..."
                                autoCapitalize="none"
                                style={{color:'black'}}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                />
                        </View>
                    </View>
                        {errors.email && touched.email && (
                          <Text style={{color:'red', fontSize: 13}}>{errors.email}</Text>
                         )}
                    <View style={{marginTop: 30}}>
                        <Button disabled={!isValid} title='Lấy lại' onPress={()=> forgotPassword(values.email)}/>
                    </View>
                </View>
            )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({

});