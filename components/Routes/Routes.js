import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabScreen from './TabScreen';
import { useSelector } from 'react-redux';


const Routes = () => {

  const userid = useSelector(state => state.userState.User);

  return (
    <NavigationContainer>
      {userid != null ? <TabScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};


export default Routes;