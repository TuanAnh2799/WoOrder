import React, {useState, useEffect} from 'react';
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
  Dimensions,
  ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import {AuthContext} from '../../Routes/AuthProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import PasswordInputText from 'react-native-hide-show-password-input';
import {connect} from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {setUserRegister} from '../../Store/action';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

function RegisterScreen({navigation,setUserRegister}) {

  const [isLoading,setIsLoading] = useState(false);

  const RegisterAuth =async(values)=> {
    setIsLoading(true);
    try {
      
     var userInfo = await auth().createUserWithEmailAndPassword(values.email,values.password);

      var userID = userInfo.user;
      let user = firebase.auth().currentUser;
      user.sendEmailVerification();
      console.log('userInffo:',user);
      // await firebase.auth().currentUser.sendEmailVerification({
      //   handleCodeInApp: false,
      // });

      // userID.sendEmailVerification(); //send confirm

      firestore()
      .collection('Users')
      .doc(userID.uid)
      .set({
        id: userID.uid,
        fullname: values.fullname,
        email: values.email,
        phone: values.phoneNumber,
        favorites: [],
        
      })
      .then(() => {
        //add UserAddress
        firestore()
        .collection('UserAddress')
        .doc(userID.uid)
        .set({
          addressID: userID.uid,
          fullname: values.fullname,
          email: values.email,
          phone: values.phoneNumber,
          isAdmin: false,
          avatar: 'https://firebasestorage.googleapis.com/v0/b/orderapp-652bc.appspot.com/o/user.png?alt=media&token=4a320416-9e29-41a6-9b47-fddadad728bb',
          address: '',
          
        })
        .then(() => {
          console.log('Added User Address!');
          //setUserRegister(userID.uid);
          navigation.navigate("Confirm");
          ToastAndroid.show('????ng k?? th??nh c??ng.',ToastAndroid.SHORT);
          setIsLoading(false);
        });
      });
      

    } catch (error) {
        setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show('T??i kho???n ???? t???n t???i.',ToastAndroid.SHORT);
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('Email kh??ng h???p l???.',ToastAndroid.SHORT);
        console.log('That email address is invalid!');
      }
      //ToastAndroid.show('????ng k?? th???t b???i.',ToastAndroid.SHORT);
    } 
}

  const registerValidSchema = Yup.object().shape({
    fullname: Yup.string()
      .max(30, () => `T??n t???i ??a 30 k?? t???.`)
      .matches(/(\w.+\s).+/, 'Vui l??ng nh???p h??? v?? t??n')
      .required('B???n ch??a nh???p h??? t??n.'),
    phoneNumber: Yup.string()
      .matches(/^(0)(\d)(?=.{8,})(?=.*[0-9])/, 'S??? ??i???n tho???i kh??ng h???p l???.')
      .required('B???n ch??a nh???p s??? ??i???n tho???i'),
    email: Yup.string()
      .max(30, () => `Email t???i ??a 30 k?? t???.`)
      .email('Vui l??ng nh???p ?????a ch??? email.')
      .required('B???n ch??a nh???p ?????a ch??? email.'),
    password: Yup.string()
      .min(6, ({min}) => `M???t kh???u ph???i l???n h??n ${min - 1} k?? t???`)
      .max(10, ({max}) => `M???t kh???u t???i ??a ${max} k?? t???`)
      .required('B???n ch??a nh???p m???t kh???u.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'M???t kh???u ph???i l???n h??n 5 k?? t???, bao g???m vi???t hoa, vi???t th?????ng v?? ch??? s???.', //(?=.*[!@#\$%\^&\*]) b??? nh???p k?? t???
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'M???t kh???u kh??ng kh???p')
      .required('B???n ch??a nh???p l???i m???t kh???u'),
  });
  
  const LoadingScreen =()=> (

    <View style={{backgroundColor:'#1c1c1c1c', width:windowWidth, height:'100%', justifyContent:'center',}}>
      <View style={{justifyContent:'center', alignSelf:'center', alignContent:'center'}}>
         <ActivityIndicator color='white' size={40} style={{marginTop: 10}} />
         <Text style={{textAlign:'center', marginTop: 10, color:'white'}}>??ang th???c hi???n...</Text>
         <Text style={{textAlign:'center', marginTop: 10, color:'white'}}>Xin vui l??ng ch??? trong gi??y l??t</Text>
       </View>
    </View>
  )

  return (
    <View style={styles.container}>
    {
      isLoading == true ? <LoadingScreen /> : null
    }
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>????ng k?? ngay!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer} duration={2000}>
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
            <ScrollView showsVerticalScrollIndicator ={false}>
              <Text style={styles.text_footer}>H??? t??n</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Nh???p h??? v?? t??n ..."
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
                  placeholder="Nh???p email ..."
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.text_err}>{errors.email}</Text>
              )}

              <Text style={[styles.text_footer, {marginTop: 15}]}>
                S??? ??i???n tho???i
              </Text>
              <View style={styles.action}>
                <FontAwesome name="phone" color="#05375a" size={20} />
                <TextInput
                  placeholder="Nh???p s??? ??i???n tho???i ..."
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
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
                M???t kh???u
              </Text>
              <View style={styles.actionPass}>
                <View style={{marginTop: 20}}>
                  <Feather name="lock" color="#05375a" size={20} />
                </View>

                <PasswordInputText
                  placeholder="Nh???p m???t kh???u ..."
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
                Nh???p l???i m???t kh???u
              </Text>
              <View style={styles.actionPass}>
                <View style={{marginTop: 20}}>
                  <Feather name="lock" color="#05375a" size={20} />
                </View>

                  <PasswordInputText
                  placeholder="Nh???p l???i m???t kh???u ..."
                  style={styles.textInputPass}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Nh???p l???i m???t kh???u..."
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
                  title="????ng k??"
                  onPress={() => {
                    //Register(values.fullname, values.email, values.password, values.phoneNumber);
                    RegisterAuth(values);
                  }}/>
              </View>
                <Text style={{marginTop: 5, fontSize: 16}}>???? c?? t??i kho???n?</Text>
                  <View style={{width: '100%', marginTop: 10}}>
                  <Button
                    title="????ng nh???p"
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

function mapDispatchToProps(dispatch) {
  return {
    setUserRegister: user => dispatch(setUserRegister(user)),
  };
}

export default connect(mapDispatchToProps, {setUserRegister})(RegisterScreen);
