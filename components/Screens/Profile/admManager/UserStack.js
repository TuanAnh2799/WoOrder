import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IconAddUserScreen from './IconAddUserScreen';
import AddUserScreen from './AddUserScreen';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
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
      {/* <Stack.Screen
        name="IconAddUser"
        component={IconAddUserScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{
          title: 'Thêm người dùng',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default UserStack;
