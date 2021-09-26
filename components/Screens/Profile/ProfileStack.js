import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './Profile';
import EditProfile from './EditProfile';
import FavoritesScreen from './Favorites';
import MyTabs from './index';
import AdminTabs from './adminTab';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Chỉnh sửa thông tin',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="MyOrder"
      component={MyTabs}
      options={{
        title: 'Đơn hàng',
        headerTitleAlign: 'center',
      }}/>

    <ProfileStack.Screen
      name="CheckOrder"
      component={AdminTabs}
      options={{
        title: 'Duyệt đơn hàng',
        headerTitleAlign: 'center',
      }}/>

    <ProfileStack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        title: 'Yêu thích',
        headerTitleAlign: 'center',
      }}
    />
    {/*
    
    
     */}
    

  </ProfileStack.Navigator>
);
export default ProfileStackScreen;
