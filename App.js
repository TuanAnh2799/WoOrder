import React, {useEffect} from 'react';
import Providers from './components/Routes/index';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen'


export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <MenuProvider>
      <Providers/>
    </MenuProvider>
  )
}

