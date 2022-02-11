import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './Profile';
import EditProfile from './EditProfile';
import FavoritesScreen from './Favorites';
import MyTabs from './index';
import AdminTabs from './adminTab';
import HelpScreen from './help';
import UserManagerScreen from './admManager/UserManager';
import ProductManagerScreen from './admManager/ProductManager';
import IconAddProductScreen from './admManager/IconAddProductScreen';
import AddProductStack from './admManager/AddProductStack';
import AddProduct from './admManager/AddProduct';
import ViewPhotoScreen from './ViewPhoto';
import IconAddUserScreen from './admManager/IconAddUserScreen';
import UserStack from './admManager/UserStack';
import AddUserScreen from './admManager/AddUserScreen';
import changePasswordScreen from './changePassword';
import statisticalScreen from './chart/statistical';


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
        title: 'Cập nhật thông tin',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen
      name="Help"
      component={HelpScreen}
      options={{
        title: 'Hỗ trợ',
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
        title: 'Quản lý đơn hàng',
        headerTitleAlign: 'center',
      }}/>
    <ProfileStack.Screen
      name="ChangePass"
      component={changePasswordScreen}
      options={{
        title: 'Đổi mật khẩu',
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

    <ProfileStack.Screen
      name="ProductManager"
      component={ProductManagerScreen}
      options={{
        headerRight: ()=> <IconAddProductScreen/>,
        title: 'Quản lý sản phẩm',
        headerTitleAlign: 'center',
    }}/>

  <ProfileStack.Screen
        name="UserManager"
        component={UserManagerScreen}
        options={{
          headerRight: ()=> <IconAddUserScreen/>,
          title: 'Quản lý người dùng',
          headerTitleAlign: 'center',
      }}/>

    <ProfileStack.Screen
        name="UserStack"
        component={UserStack}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
      }}/>

      <ProfileStack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{
          title: 'Thêm người dùng',
          headerTitleAlign: 'center',
      }}/>

    <ProfileStack.Screen
        name="AddProductStack"
        component={AddProductStack}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
      }}/>

    <ProfileStack.Screen
        name="Add"
        component={AddProduct}
        options={{
          title:'Thêm sản phẩm',
          headerTitleAlign: 'center',
          headerShown: true,
      }}/>

    <ProfileStack.Screen
        name="Chart"
        component={statisticalScreen}
        options={{
          title:'Quản lý thống kê',
          headerTitleAlign: 'center',
          headerShown: true,
      }}/>

      <ProfileStack.Screen
        name="ViewPhoto"
        component={ViewPhotoScreen}
        options={{
          title: '',
          headerShown: true,
      }}/>

  </ProfileStack.Navigator>
);
export default ProfileStackScreen;
