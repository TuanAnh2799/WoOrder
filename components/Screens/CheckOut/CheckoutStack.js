import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckOutScreen from './Checkout';
import MyOrderScreen from '../Profile/myOrder';


const CheckStack = createStackNavigator();

export default function CheckStackScreen() {

    return (
        <CheckStack.Navigator>
            <CheckStack.Screen name="CheckOut" component={CheckOutScreen} options={{
                title:'Đặt hàng',
                headerTitleAlign:'center',
            }}/>
            <CheckStack.Screen name="MyOrder" component={MyOrderScreen} options={{
                title:'Đơn hàng',
                headerTitleAlign:'center',
            }}/>
        </CheckStack.Navigator>
    )
}