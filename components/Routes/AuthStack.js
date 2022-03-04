import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../Screens/Register/Register';
import LoginScreen from '../Screens/Login/Login';
import ForgotPasswordScreen from '../Screens/Login/forgotPassword';
import ConfirmEmailScreen from '../Screens/Register/confirmEmail';

const Stack = createStackNavigator();

const AuthStack =()=>{
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{
                headerShown: true, 
                title:"Quên mật khẩu",
                 headerTitleAlign:'center'}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Confirm" component={ConfirmEmailScreen} options={{headerShown: true,
            headerTitle: 'Xác minh tài khoản',
            headerTitleAlign: 'center',
            }}/>
        </Stack.Navigator>
    );
}
export default AuthStack;