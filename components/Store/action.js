export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const CLEAR_FAVORITE = 'CLEAR_FAVORITE';
export const ADD_HISTORIC = 'ADD_HISTORIC';
export const RESET_STORE = 'RESET_STORE';
export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_REGISTER = 'SET_USER_REGISTER';
export const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_FAVORITE = 'SET_FAVORITE';

export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}
export const resetStore = () => {
    return {
      type: 'RESET_STORE'
    }
  }

export const AddToFavorite =(payload)=> {
    return {
        type: 'ADD_FAVORITE',payload
    }
    
};

export const setFavorite =(payload)=> {
    return {
        type: 'SET_FAVORITE',payload
    }
    
};

export const clearFavorite =()=> {
    return { type: 'CLEAR_FAVORITE'}
}; 

const AddHistoricName = payload => {
    return { type: 'ADD_HISTORIC', payload }
}

export function setUserLogin(payload){
    return{
        type:'SET_USER_LOGIN',
        payload
    }
};

export function setUserRegister(payload){
    return{
        type:'SET_USER_REGISTER',
        payload
    }
};

export const setUserLogout = () => {
    return { type: 'SET_USER_LOGOUT'}
};

export function setProduct(payload){
    return{
        type:'SET_PRODUCT',
        payload
    }
};

export function deleteProduct(payload){
    return{
        type:'DELETE_PRODUCT',
        payload
    }
};


