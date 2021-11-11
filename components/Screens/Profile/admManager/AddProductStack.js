import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IconAddProductScreen from './IconAddProductScreen';
import AddProduct from './AddProduct';

const Stack = createStackNavigator();

const AddProductStack = () => {
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
      <Stack.Screen
        name="IconAdd"
        component={IconAddProductScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add"
        component={AddProduct}
        options={{
          title: 'Thêm sản phẩm',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default AddProductStack;
