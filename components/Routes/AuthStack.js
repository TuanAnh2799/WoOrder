import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../Screens/Register/Register';
import LoginScreen from '../Screens/Login/Login';

const Stack = createStackNavigator();

const AuthStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
export default AuthStack;