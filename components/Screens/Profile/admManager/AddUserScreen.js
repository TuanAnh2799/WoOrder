import React, {useContext, useState} from 'react'
import { StyleSheet, Text, View, Button,TextInput, SafeAreaView, Platform, Dimensions, ToastAndroid } from 'react-native'
import {Formik} from 'formik';
import * as Yup from 'yup';
import PasswordInputText from 'react-native-hide-show-password-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const registerValidSchema = Yup.object().shape({
    fullname: Yup.string()
      .max(25, () => `Tên tối đa 25 ký tự.`)
      .matches(/(\w.+\s).+/, 'Vui lòng nhập họ và tên')
      .required('Bạn chưa nhập họ tên.'),
    phoneNumber: Yup.string()
      .matches(/^(0)(\d)(?=.{8,})(?=.*[0-9])/, 'Số điện thoại không hợp lệ.')
      .required('Bạn chưa nhập số điện thoại'),
    email: Yup.string()
      .max(30, () => `Email tối đa 30 ký tự.`)
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
  });

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

const AddUserScreen = () => {

    const [checked, setChecked] = React.useState('1'); //type
    const [isLoading, setIsLoading] = useState(false);

    const RegisterAuth =async(values,isAdmin)=> {
        setIsLoading(true);
        console.log('list data user:',values.fullname,values.email, values.phoneNumber, values.password,isAdmin);
        try {
          
         var userIfo = await auth().createUserWithEmailAndPassword(values.email,values.password);

         
          var userID = userIfo.user;
          console.log('userID:',userID.uid);
          firestore()
          .collection('Users')
          .doc(userID.uid)
          .set({
            id: userID.uid,
            fullname: values.fullname,
            email: values.email,
            phone: parseInt(values.phoneNumber),
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
              phone: parseInt(values.phoneNumber),
              isAdmin: isAdmin,
              avatar: 'https://firebasestorage.googleapis.com/v0/b/orderapp-652bc.appspot.com/o/user.png?alt=media&token=4a320416-9e29-41a6-9b47-fddadad728bb',
              address: '',
              
            })
            .then(() => {
              console.log('Added User Address!');
              ToastAndroid.show('Thêm thành công.',ToastAndroid.SHORT);
              setIsLoading(false);
            });
          });
          

        } catch (error) {
            setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            ToastAndroid.show('Tài khoản đã tồn tại.',ToastAndroid.SHORT);
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            ToastAndroid.show('Email không hợp lệ.',ToastAndroid.SHORT);
            console.log('That email address is invalid!');
          }
          //ToastAndroid.show('Đăng ký thất bại.',ToastAndroid.SHORT);
        } 
    }
    const addUser =async (value) => {
        
        if(checked == 2)
        {
            RegisterAuth(value,true);
        }
        else {
            RegisterAuth(value,false);
        }
        
    }

    const LoadingScreen =()=> (

        <View style={{backgroundColor:'#1c1c1c1c', width:windowWidth, height:windowHeight, justifyContent:'center',}}>
          <View style={{justifyContent:'center', alignSelf:'center', alignContent:'center'}}>
             <ActivityIndicator color='green' size={40} style={{marginTop: 10}} />
             <Text style={{textAlign:'center', marginTop: 10, color:'black'}}>Đang thực hiện...</Text>
             <Text style={{textAlign:'center', marginTop: 10, color:'black'}}>Xin vui lòng chờ trong giây lát</Text>
           </View>
        </View>
      )

    return (
        <SafeAreaView style={{flex: 1}}>
        <Formik
          validationSchema={registerValidSchema}
          initialValues={{
            fullname: '',
            phoneNumber: '',
            email: '',
            password: '',
          }}
          validateOnMount={true}
          onSubmit={async (values, { resetForm }) => {
          await addUser(values)
            resetForm()
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
              <View style={{width:'100%', height: '100%', justifyContent:'center'}}>
                {
                    isLoading ? (<LoadingScreen/>) : (
                        <View style={{height: '100%', justifyContent:'center', alignItems:'center'}}>
                            <View style={{borderWidth: 1,  backgroundColor:'#fff', width: '90%', height: 420, justifyContent:'center', borderRadius: 10, shadowColor:'black', elevation: 10, borderColor:'#fff'}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesome name="user-o" color="#05375a" size={20} />
                                    </View>
                                    <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                                        <TextInput style={{width: '100%', height: '100%', color:'black'}} 
                                        placeholder='Họ tên ...'
                                        autoCapitalize="none"
                                        onChangeText={handleChange('fullname')}
                                        onBlur={handleBlur('fullname')}
                                        value={values.fullname}
                                        />
                                    </View>
                                </View>

                                {errors.fullname && touched.fullname && (
                                    <Text style={styles.text_err}>{errors.fullname}</Text>
                                )}

                                <View style={{flexDirection:'row', marginTop: 20}}>
                                    <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesome name="check" color="#05375a" size={20} />
                                    </View>
                                    <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                                        <View style={{width: '100%', height: 35, flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                                            <RadioButton
                                            value="1"
                                            status={checked === '1' ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked('1')}
                                            />
                                            <Text style={styles.labelRadioBtn}>Người dùng</Text>

                                            <RadioButton
                                            value="2"
                                            status={checked === '2' ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked('2')}
                                            />
                                            <Text style={styles.labelRadioBtn}>Admin</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection:'row', marginTop: 20}}>
                                    <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesome name="envelope" color="#05375a" size={20} />
                                    </View>
                                    <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                                        <TextInput style={{width: '100%', height: '100%', color:'black'}} 
                                            placeholder='Email ...'
                                            autoCapitalize="none"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                    </View>
                                </View>

                                {errors.email && touched.email && (
                                    <Text style={styles.text_err}>{errors.email}</Text>
                                )}

                                <View style={{flexDirection:'row', marginTop: 20}}>
                                    <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesome name="phone" color="#05375a" size={25} />
                                    </View>
                                    <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                                        <TextInput style={{width: '100%', height: '100%', color:'black'}} placeholder='Số điện thoại ...'
                                            autoCapitalize="none"
                                            onChangeText={handleChange('phoneNumber')}
                                            onBlur={handleBlur('phoneNumber')}
                                            value={values.phoneNumber}
                                            keyboardType="phone-pad"
                                        />
                                    </View>
                                </View>

                                {errors.phoneNumber && touched.phoneNumber && (
                                    <Text style={styles.text_err}>{errors.phoneNumber}</Text>
                                )}

                                <View style={{flexDirection:'row', marginTop: 20}}>
                                    <View style={{width:'10%',justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesome name="lock" color="#05375a" size={24} />
                                    </View>
                                    <View style={{width: '85%', borderRadius: 10, backgroundColor:'white', height: 40, borderColor:'green', borderWidth: 0.5}}>
                                        <PasswordInputText
                                            style={styles.textInputPass}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            placeholder="Nhập mật khẩu..."
                                            secureTextEntry={true}
                                            label=''
                                        />
                                    </View>
                                </View>

                                {errors.password && touched.password && (
                                    <Text style={styles.text_err}>{errors.password}</Text>
                                )}

                                <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop: 40}}>
                                    <View style={{width:'50%'}}>
                                        <Button disabled={!isValid} title='Thêm' onPress={()=>handleSubmit()}/>
                                    </View>
                                </View>
                            </View>
                            
                    </View>
                    )
                }
                
            </View>
            )}
            </Formik>
        </SafeAreaView>
        
    )
}

export default AddUserScreen

const styles = StyleSheet.create({
    textInputPass: {
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        //paddingLeft: 10,
        width: '100%',
    },
    textInputPass: {
        marginTop: Platform.OS === 'ios' ? 0 : -24,
        paddingLeft: 10,
        height: 40,
        width: '95%',
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        width: '85%',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        left: 15,
        marginTop: 10,
    },
    text_err: {
        color: 'red',
        fontSize: 13,
        marginLeft: '10%'
      },
    labelRadioBtn: {
        left: -20
    }
})
