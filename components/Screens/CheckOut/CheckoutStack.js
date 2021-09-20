import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckOutScreen from './Checkout';


const CheckStack = createStackNavigator();

export default function CheckStackScreen() {

    return (
        <CheckStack.Navigator>
            <CheckStack.Screen name="CheckOut" component={CheckOutScreen} options={{
                title:'Đặt hàng',
                headerTitleAlign:'center',
            }}/>
        </CheckStack.Navigator>
    )
}