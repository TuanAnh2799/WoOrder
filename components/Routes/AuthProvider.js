import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
	
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
            } catch (e) {
              console.log(e);
            }
          },
          register: async (email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
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