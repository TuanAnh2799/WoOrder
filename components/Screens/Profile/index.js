import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CancelOrdersScreen from './CancelOrders';
import DeliveredScreen from './Delivered';
import MyOrderScreen from './myOrder';
import ShippingScreen from './Shipping';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Đơn hàng" component={MyOrderScreen} />
      <Tab.Screen name="Đang giao" component={ShippingScreen} />
      <Tab.Screen name="Đã giao" component={DeliveredScreen} />
      <Tab.Screen name="Đã hủy" component={CancelOrdersScreen} />
    </Tab.Navigator>
  );
}