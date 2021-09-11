import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { Provider as StoreProvider } from 'react-redux';
import store from '../Store/store';

const Providers = () => {
  return (
    <StoreProvider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </StoreProvider>
    
  );
}
 
export default Providers;