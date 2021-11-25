import React from 'react';
import Providers from './components/Routes/index';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>
      <Providers/>
    </MenuProvider>
  )
}

