import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppScreen from './AppStack';
import ProfileStackScreen from '../Screens/Profile/ProfileStack';
import CheckStackScreen from '../Screens/CheckOut/CheckoutStack';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    const isAdmin = useSelector(state => state.userState.isAdmin);
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
        } else if (route.name === 'Giỏ hàng') {
          iconName = 'shopping-cart';
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
      keyboardHidesTabBar: true,
      showLabel: true,
      labelStyle: {fontSize: 15},
      style: {position:'absolute'},
    }}
    initialRouteName="Trang chủ"
    >
      <Tab.Screen name="Trang chủ" component={AppScreen} />
      {
        isAdmin ? null : <Tab.Screen name="Giỏ hàng" component={CheckStackScreen} options={{ tabBarBadge: cartItems}}/>
      }
      
      <Tab.Screen name="Tôi" component={ProfileStackScreen} />
    </Tab.Navigator>  
    )
}
