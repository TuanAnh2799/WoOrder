import { createStore} from 'redux';
import reducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer,persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
export default ()=>{
    const persistedReducer = persistReducer(persistConfig,reducer);
    let store =  createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor };
};


//export default store;