import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AdminOrderScreen from './adminCheck/adminListOrder';
import AdminCancelOrdersScreen from './adminCheck/adminCancelOrder';
import AdminShippingScreen from './adminCheck/adminShipping';
import AdminDeliveredScreen from './adminCheck/adminDelivered';

const AdmTab = createMaterialTopTabNavigator();

export default function AdminTabs() {
  return (
    <AdmTab.Navigator>
      <AdmTab.Screen name="Đơn hàng" component={AdminOrderScreen} />
      <AdmTab.Screen name="Giao hàng" component={AdminShippingScreen} />
      <AdmTab.Screen name="Đã giao" component={AdminDeliveredScreen} />
      <AdmTab.Screen name="Đã hủy" component={AdminCancelOrdersScreen} />
    </AdmTab.Navigator>
  );
}
