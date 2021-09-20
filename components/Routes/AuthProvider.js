import React, {createContext, useState,useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
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
             await  auth().signInWithEmailAndPassword(email, password);
              
            } catch (e) {
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
            }
          },
          register: async (fullname,email, phonenumber, password) => {
            try {
              console.log("Auth nhaajn ddc data:",fullname,email,phonenumber,password);

             var userIfo = await auth().createUserWithEmailAndPassword(email,password);
              console.log('userid"   ',userIfo.user.uid);
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
                console.log('User added!');
              });
            } catch (e) {
              Alert.alert(
                'Thông báo',
                'Đăng ký thất bại.',
                [  
                  {
                    text: 'Đồng ý', onPress: () => {
                       
                      }
                  },    
                ]  
              );
            } 
          },
          logout: async () => {
            try {
              await Alert.alert(
                'Thông báo',
                'Bạn muốn đăng xuất?',
                [  
                  {
                    text: 'Đồng ý', onPress: () => {
                       auth().signOut()
                      }
                  },  
                  {  
                      text: 'Hủy',  
                      onPress: () => console.log('Cancel Pressed'),  
                      style: 'cancel',  
                  },  
                ]  
              );
              
            } catch (e) {

              
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    );
  };