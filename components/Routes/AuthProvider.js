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
              console.log(e);
            }
          },
          register: async (email, password,username) => {
            try {
             var userIfo = await auth().createUserWithEmailAndPassword(email, password);
              console.log('abc"   ',userIfo.user.uid);
              var userID = userIfo.user;
              firestore()
              .collection('Users')
              .doc(userID.uid)
              .set({
                id: userID.uid,
                name: username,
                email: userID.email,
                itemCart: [],
                
              })
              .then(() => {
                console.log('User added!');
              });
            } catch (e) {
              console.log(e);
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
              console.log(e);
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    );
  };