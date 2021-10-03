import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppScreen from './AppStack';
import ProfileStackScreen from '../Screens/Profile/ProfileStack';
import CheckOutScreen from '../Screens/CheckOut/Checkout';
import CheckStackScreen from '../Screens/CheckOut/CheckoutStack';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabScreen() {

    const cartItems = useSelector(state => state.cartStore.numberCart);
    console.log("length",cartItems)

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Trang chủ') {
          iconName = 'home';
          size = focused ? 23 : 20;
        } else if (route.name === 'Đặt hàng') {
          iconName = 'shopping-bag';
          size = focused ? 23 : 20;
        }
        else if(route.name === 'Tôi')
        {
            iconName = 'user-circle';
            size = focused ? 23 : 20;
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: true,
      labelStyle: {fontSize: 15}
    }}
    initialRouteName="Trang chủ"
    >
      <Tab.Screen name="Trang chủ" component={AppScreen}/>
      <Tab.Screen name="Đặt hàng" component={CheckStackScreen} options={{ tabBarBadge: cartItems}}/>
      <Tab.Screen name="Tôi" component={ProfileStackScreen} />
    </Tab.Navigator>  
    )
}
