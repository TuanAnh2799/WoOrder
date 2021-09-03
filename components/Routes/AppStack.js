import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/Home';
import DetailsScreen from '../Screens/Details/Details';

const AppStack = createStackNavigator();

export default function AppScreen() {
    return (
        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="Details" component={DetailsScreen} />
        </AppStack.Navigator>
    )
}
