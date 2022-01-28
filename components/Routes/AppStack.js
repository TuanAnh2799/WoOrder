import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/Home';
import DetailsScreen from '../Screens/Details/Details';
import ProductsScreen from '../Screens/ListProducts/Products';
import CartScreen from '../Screens/Cart/Cart';
import HeaderScreen from '../Screens/Header/Header';
import SearchScreen from '../Screens/SearchBar/SearchBar';
import Checkout from '../Screens/CheckOut/Checkout';


const AppStack = createStackNavigator();

export default function AppScreen() {

    return (
        <AppStack.Navigator initialRouteName='Home'>
            <AppStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <AppStack.Screen name="Products" component={ProductsScreen}/>
            <AppStack.Screen name="Details" component={DetailsScreen} options={{
                title:'Chi tiết',
                headerTitleAlign:'center',
                }}/>
            <AppStack.Screen name="Search" component={SearchScreen} options={{
                title: 'Tìm kiếm',
                headerTitleAlign:'center',
            }} />
            <AppStack.Screen name="Cart" component={CartScreen} options={{
                title:'Giỏ hàng',headerTitleAlign:'center',
                }}/>
        </AppStack.Navigator>
    )
}
