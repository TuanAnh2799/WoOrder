import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import Banner from '../../../img/banner.jpg';
import {AuthContext} from '../../Routes/AuthProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import PasswordInputText from 'react-native-hide-show-password-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  //const [email, onChangeEmail] = React.useState("");
  //const [password, onChangePass] = React.useState("");

  const loginValidSchema = Yup.object().shape({
    email: Yup.string()
      .email('Vui lòng nhập địa chỉ email')
      .required('Bạn chưa nhập địa chỉ email.'),
    password: Yup.string()
      .min(6, ({min}) => `Mật khẩu phải lớn hơn ${min - 1} ký tự`)
      .max(10, ({max}) => `Mật khẩu tối đa ${max} ký tự`)
      .required('Bạn chưa nhập mật khẩu.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Mật khẩu phải lớn hơn 5 ký tự, bao gồm viết hoa, viết thường và số.',
      ), //(?=.*[!@#\$%\^&\*]) bỏ phải nhập ký tự
  });

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Formik
        validationSchema={loginValidSchema}
        initialValues={{email: '', password: ''}}
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
          <View style={{flex: 1, height: '100%'}}>
            <View style={styles.bannerWrapp}>
              <Image
                source={{
                  uri: 'https://www.smartsheet.com/sites/default/files/ic-og-CustomerOrderManagement-FacebookLinkedIn.jpg',
                }}
                style={styles.banner}
              />
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.Input}>
              <Text style={[styles.text, {marginTop: 35}]}>Email</Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <FontAwesome
                  name="envelope"
                  color="#05375a"
                  size={20}
                  style={{marginLeft: 15}}
                />
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
                <Text style={{fontSize: 14, color: 'red', marginLeft: '5%'}}>
                  {errors.email}
                </Text>
              )}
              <View>
                <Text style={styles.text}>Mật khẩu</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />
                  </View>

                  <PasswordInputText
                    style={styles.textInputPass}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Nhập mật khẩu..."
                    secureTextEntry={true}
                    label=""
                  />
                </View>

                {errors.password && touched.password && (
                  <Text style={{fontSize: 14, color: 'red', marginLeft: '5%'}}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <View style={styles.wrapButton}>
                <View style={styles.button}>
                  <Button
                    title="Đăng nhập"
                    disabled={!isValid}
                    onPress={() => login(values.email, values.password)}
                  />
                  <Text
                    style={{padding: 15, fontSize: 17, textAlign: 'center'}}>
                    Chưa có tài khoản?
                  </Text>
                  <Button
                    title="Đăng ký"
                    onPress={() => navigation.navigate('Register')}
                  />
                </View>
              </View>
            </Animatable.View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
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
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -25,
  },
  wrapButton: {
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
  input1: {
    paddingTop: 40,
  },
  text: {
    fontSize: 16,
    left: 15,
    marginTop: 10,
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    width: '85%',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInputPass: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    width: '85%',
  },
});
export default LoginScreen;
