import React, {createContext, useState,useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
   
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
             await auth().signInWithEmailAndPassword(email, password);
             ToastAndroid.show('Đăng nhập thành công.',ToastAndroid.SHORT);
            } catch (e) {
              {
                /*
                Alert.alert(
                'Thông báo',
                'Sai tên tài khoản hoặc mật khẩu.',
                [  
                  {
                    text: 'Đồng ý', onPress: () => {
                       
                      }
                  },  
                  
                ]  
              );
                 */
              }
              ToastAndroid.show('Tên tài khoản hoặc mật khẩu không chính xác.',ToastAndroid.SHORT);
            }
          },
          register: async (fullname,email, phonenumber, password) => {
            try {

             var userIfo = await auth().createUserWithEmailAndPassword(email,password);

             ToastAndroid.show('Đăng ký thành công.',ToastAndroid.SHORT);
              var userID = userIfo.user;
              firestore()
              .collection('Users')
              .doc(userID.uid)
              .set({
                id: userID.uid,
                fullname: fullname,
                email: userID.email,
                phone: phonenumber,
                itemCart: [],
                
              })
              .then(() => {
                //add UserAddress
                firestore()
                .collection('UserAddress')
                .doc(userID.uid)
                .set({
                  addressID: userID.uid,
                  fullname: fullname,
                  email: userID.email,
                  phone: phonenumber,
                  address: '',
                  
                })
                .then(() => {
                  console.log('Added User Address!');
                });
              });
              

            } catch (err) {
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
          },
          logout: async () => {
            try {
              await auth().signOut()
                     
              
            } catch (e) {

              
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    );
  };