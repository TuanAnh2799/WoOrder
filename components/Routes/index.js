import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { Provider as StoreProvider } from 'react-redux';
import reduxStore from '../Store/store';
import { PersistGate } from 'redux-persist/integration/react';
const Providers = () => {

  const {store, persistor} = reduxStore();

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PersistGate>
    </StoreProvider>
    
  );
}
 
export default Providers;