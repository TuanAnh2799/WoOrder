import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  LogBox,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../Routes/AuthProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import PasswordInputText from 'react-native-hide-show-password-input';


LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

export default function RegisterScreen({navigation}) {
  const {register} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const registerValidSchema = Yup.object().shape({
    fullname: Yup.string()
      .max(25, () => `Tên tối đa 25 ký tự.`)
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
      .max(10, ({max}) => `Mật khẩu tối đa ${max} ký tự`)
      .required('Bạn chưa nhập mật khẩu.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường và chữ số.', //(?=.*[!@#\$%\^&\*]) bỏ nhập ký tự
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Bạn chưa nhập lại mật khẩu'),
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Đăng ký ngay!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
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
            <ScrollView>
              <Text style={styles.text_footer}>Họ tên</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Nhập họ và tên ..."
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  value={values.fullname}
                />
              </View>
              {errors.fullname && touched.fullname && (
                <Text style={styles.text_err}>{errors.fullname}</Text>
              )}

              <Text style={[styles.text_footer, {marginTop: 15}]}>Email</Text>
              <View style={styles.action}>
                <FontAwesome name="envelope" color="#05375a" size={20} />
                <TextInput
                  placeholder="Nhập email ..."
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Nhập email..."
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.text_err}>{errors.email}</Text>
              )}

              <Text style={[styles.text_footer, {marginTop: 15}]}>
                Số điện thoại
              </Text>
              <View style={styles.action}>
                <FontAwesome name="phone" color="#05375a" size={20} />
                <TextInput
                  placeholder="Nhập số điện thoại ..."
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  placeholder="Nhập số điện thoại..."
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.text_err}>{errors.phoneNumber}</Text>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}>
                Mật khẩu
              </Text>
              <View style={styles.actionPass}>
                <View style={{marginTop: 20}}>
                  <Feather name="lock" color="#05375a" size={20} />
                </View>

                <PasswordInputText
                  placeholder="Nhập mật khẩu ..."
                  style={styles.textInputPass}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label=""
                  secureTextEntry={true}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.text_err}>{errors.password}</Text>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}>
                Nhập lại mật khẩu
              </Text>
              <View style={styles.actionPass}>
                <View style={{marginTop: 20}}>
                  <Feather name="lock" color="#05375a" size={20} />
                </View>

                <PasswordInputText
                  placeholder="Nhập lại mật khẩu ..."
                  style={styles.textInputPass}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Nhập lại mật khẩu..."
                  secureTextEntry={true}
                  label=""
                />
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.text_err}>{errors.confirmPassword}</Text>
              )}

              <View style={styles.button}>
              <View style={{width: '100%', top: -10}}>
                <Button
                  disabled={!isValid}
                  title="Đăng ký"
                  onPress={() => {
                    setIsLoading(true);
                    register(
                      values.fullname,
                      values.email,
                      values.phoneNumber,
                      values.password,
                    );
                  }}/>
              </View>
                <Text style={{marginTop: 5, fontSize: 16}}>Đã có tài khoản?</Text>
                  <View style={{width: '100%', marginTop: 10}}>
                  <Button
                    title="Đăng nhập"
                    onPress={() => navigation.navigate("Login")
                    }/>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
  },
  text_err: {
    color: 'red',
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionPass :{
    flexDirection: 'row',
    marginTop: 5,

  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  textInputPass: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    width: '92%',
  },
});
