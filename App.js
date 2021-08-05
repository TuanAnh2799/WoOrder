import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Screens/Login/Login';
import Home from './components/Screens/Home/Home';
import Complete from './components/Screens/complete/complete';
import Remaining from './components/Screens/Remaining/Remaining';
import DetaiComplete from './components/Screens/Detail/detailComplete';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Complete" component={Complete} options={{headerShown: false}}/>
        <Stack.Screen name="DetaiComplete" component={DetaiComplete} options={{headerShown: false}}/>
        <Stack.Screen name="Remaining" component={Remaining} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;