import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
//import { AuthContext } from './AuthProvider';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import TabScreen from './TabScreen';

const Routes = () => {
  //const {user, setUser} = useContext(AuthContext);
  //const [initializing, setInitializing] = useState(true);
  const user = useSelector(state => state.userState.User);

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // };
 
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
 
  // if (initializing) return null;
 
  return (
    <NavigationContainer>
      {user != null ? <TabScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};
   export default Routes;