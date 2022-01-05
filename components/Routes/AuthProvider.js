import React, {createContext, useState,useContext} from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
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
          register: async (fullname,email, phonenumber, password,isAdmin) => {
              console.log('list data user:',fullname,email, phonenumber, password,isAdmin);
            try {
              
             var userIfo = await auth().createUserWithEmailAndPassword(email,password);
              console.log('thông tin đăng ký:',userIfo);
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
                  isAdmin: isAdmin,
                  avatar: 'https://firebasestorage.googleapis.com/v0/b/orderapp-652bc.appspot.com/o/user.png?alt=media&token=4a320416-9e29-41a6-9b47-fddadad728bb',
                  address: '',
                  
                })
                .then(() => {
                  console.log('Added User Address!');
                });
              });
              

            } catch (error) {
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