import {createStore} from 'redux';

import {cartItems} from './reducer';

 export const store = createStore(cartItems);