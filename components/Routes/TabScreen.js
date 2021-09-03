import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ChatScreen from '../Screens/Chat/Chat';
import AppScreen from './AppStack';
import ProfileStackScreen from '../Screens/Profile/ProfileStack';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Trang chủ') {
          iconName = 'home';
          size = focused ? 25 : 20;
        } else if (route.name === 'Chat') {
          iconName = 'comments';
          size = focused ? 25 : 20;
        }
        else if(route.name === 'Tôi')
        {
            iconName = 'user-circle';
            size = focused ? 25 : 20;
        }

        // You can return any component that you like here!
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: true,
      labelStyle: {fontSize: 15}
    }}
    >
      <Tab.Screen name="Trang chủ" component={AppScreen}/>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Tôi" component={ProfileStackScreen} />
    </Tab.Navigator>  
    )
}
