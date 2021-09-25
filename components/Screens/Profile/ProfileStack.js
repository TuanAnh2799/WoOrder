import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './Profile';
import EditProfile from './EditProfile';
import FavoritesScreen from './Favorites';
import MyOrderScreen from './myOrder';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator 
    screenOptions ={{
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    headerShown: false,
    }}>
        <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        
        />
        <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        />
        <ProfileStack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        />
        <ProfileStack.Screen 
        name="MyOrder" 
        component={MyOrderScreen} 
        options={{
                title:'Đơn hàng',
                headerTitleAlign:'center',
            }}
        />
    </ProfileStack.Navigator>
)
export default ProfileStackScreen;