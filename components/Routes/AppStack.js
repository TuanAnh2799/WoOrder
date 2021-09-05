import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/Home';
import DetailsScreen from '../Screens/Details/Details';
import ProductsScreen from '../Screens/ListProducts/Products';
import Icon from 'react-native-vector-icons/Ionicons';
import CartScreen from '../Screens/Cart/Cart';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const AppStack = createStackNavigator();

export default function AppScreen() {

    const navigation = useNavigation();
    
    return (
        <AppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor:'#fff',
                    
                },
                headerTintColor:'#000',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight:'500'
                }
            }}
        >
            <AppStack.Screen name="Home" component={HomeScreen} 
            options={{
                title: 'Trang chủ',
                headerLeft: ()=>(
                    <Icon.Button name="ios-menu"
                        size={27}
                        backgroundColor='#fff'
                        color='#000'
                        onPress={()=>Alert.alert('Nhắc nhở','Chức năng sẽ có trong thời gian tới!')}
                    />
                ),
                headerRight: ()=>(
                    <Icon.Button name="cart"
                        size={27}
                        backgroundColor='#fff'
                        color='red'
                        onPress={()=> navigation.navigate('Cart')}
                    />
                )
            }}/>
            <AppStack.Screen name="Products" component={ProductsScreen}/>
            <AppStack.Screen name="Details" component={DetailsScreen} />
            <AppStack.Screen name="Cart" component={CartScreen} options={{title:'Giỏ hàng'}}/>
        </AppStack.Navigator>
    )
}
