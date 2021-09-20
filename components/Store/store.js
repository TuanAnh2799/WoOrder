import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
//import thunkMiddleware from 'redux-thunk';
//import ShopApp from '../Store/reducer'
//const store =  createStore(ShopApp,applyMiddleware(thunkMiddleware));
const store =  createStore(reducer);
export default store;