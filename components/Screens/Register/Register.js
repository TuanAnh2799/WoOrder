import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Banner from '../../../img/banner.jpg';
import {AuthContext} from '../../Routes/AuthProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';

const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function RegisterScreen({navigation}) {
  const {register} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const registerValidSchema = Yup.object().shape({
    fullname: Yup.string().max(25, ()=>`Tên tối đa 25 ký tự.`)
      .matches(/(\w.+\s).+/, 'Vui lòng nhập họ và tên')
      .required('Bạn chưa nhập họ tên.'),
    phoneNumber: Yup.string()
      .matches(/^(0)(\d)(?=.{8,})(?=.*[0-9])/, 'Số điện thoại không hợp lệ.')
      .required('Bạn chưa nhập số điện thoại'),
    email: Yup.string()
      .email('Vui lòng nhập địa chỉ email.')
      .required('Bạn chưa nhập địa chỉ email.'),
    password: Yup.string()
      .min(6, ({min}) => `Mật khẩu phải lớn hơn ${min - 1} ký tự`)
      .required('Bạn chưa nhập mật khẩu.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường, chữ số và ký tự.', //(?=.*[!@#\$%\^&\*]) bỏ nhập ký tự
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Bạn chưa nhập lại mật khẩu'),
  });
  return (
    <SafeAreaView style={{flex: 1, width: deviceWitdh, height: deviceHeight}}>
    <ScrollView snapToEnd={false}>
      <Formik
        validationSchema={registerValidSchema}
        initialValues={{
          fullname: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
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
          
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={styles.wrappTitles}>
                    <Text style={{fontSize: 23, fontWeight: '600'}}>
                      Đăng ký
                    </Text>
                  </View>
                  <View style={{flex: 0.5, backgroundColor:'red', height: 200}}>
                        <Image source={Banner} style={styles.banner}/>
                  </View>
                  <View style={styles.Input}>
                    <View style={{marginTop: 35}}>
                      <Text style={styles.text}>Tên tài khoản</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('fullname')}
                        onBlur={handleBlur('fullname')}
                        value={values.fullname}
                        placeholder="Tên tài khoản..."
                      />
                      {errors.fullname && touched.fullname && (
                        <Text style={styles.textErr}>{errors.fullname}</Text>
                      )}
                    </View>

                    <View style={styles.input1}>
                      <Text style={styles.text}>Email</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Nhập email..."
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.textErr}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={styles.input1}>
                      <Text style={styles.text}>Số điện thoại</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        placeholder="Nhập số điện thoại..."
                        keyboardType="phone-pad"
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={styles.textErr}>{errors.phoneNumber}</Text>
                      )}
                    </View>

                    <View>
                      <Text style={styles.text}>Mật khẩu</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Nhập mật khẩu..."
                        secureTextEntry={true}
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.textErr}>{errors.password}</Text>
                      )}
                    </View>

                    <View>
                      <Text style={styles.text}>Nhập lại mật khẩu</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        placeholder="Nhập lại mật khẩu..."
                        secureTextEntry={true}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.textErr}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.wrapButton}>
                    <View style={styles.button}>
                      <Button
                        title="Đăng ký"
                        disabled={!isValid}
                        onPress={() => {
                          setIsLoading(true);
                          register(
                            values.fullname,
                            values.email,
                            values.phoneNumber,
                            values.password,
                          );
                        }}
                      />
                      <Text
                        style={{
                          padding: 15,
                          fontSize: 17,
                          textAlign: 'center',
                        }}>
                        Đã có tài khoản?
                      </Text>
                      <Button
                        title="Đăng nhập"
                        onPress={() => navigation.navigate('Login')}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          
        )}
      </Formik></ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrappTitles: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    borderWidth: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#b2c7de',
  },
  Input: {
    width: deviceWitdh,
    flex: 7,
    marginTop: 10,
  },
  wrapButton: {
    flex: 1,
    top: 20,
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
  input1: {
    paddingTop: 4,
  },
  text: {
    fontSize: 16,
    left: 10,
    marginTop: 2,
  },
  textErr: {
    fontSize: 12,
    color: 'red',
    marginLeft: '4%',
  },
  bannerWrapp: {
    width: '100%',
    flex: 2,
  },
  banner: {
    width: '100%',
    height: '100%',
},
});
