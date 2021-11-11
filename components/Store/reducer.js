import {GET_NUMBER_CART,ADD_CART,ADD_FAVORITE, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART, CLEAR_FAVORITE,RESET_STORE} from  './action';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../Routes/AuthProvider';
import { addToFav } from '../Screens/API/addToFav';
import { ToastAndroid } from 'react-native';



const initProduct = {
    numberCart: 0,
    Carts:[],
}

const initFav = {
    favoriteProduct: []
}
const favoriteReducer = (state =initFav, action) => {
    
    switch (action.type) {

      case ADD_FAVORITE:
        const indexExit = state.favoriteProduct.findIndex(fav => fav.id === action.payload.id)
        if(indexExit >= 0){
            const updateFav = [...state.favoriteProduct]
            const remove = updateFav.map(item => {
                return item.id
            }).indexOf(action.payload.id)
            updateFav.splice(remove,1) // xóa 1 phần tử remove trong array
            ToastAndroid.show("Đã xóa khỏi mục yêu thích.", ToastAndroid.SHORT)
            return{
                ...state,
                favoriteProduct: updateFav
            }
        } else {
            const favorite = action.payload;
            ToastAndroid.show("Đã thêm vào mục yêu thích.", ToastAndroid.SHORT)
            return {
                ...state,
                favoriteProduct: state.favoriteProduct.concat(favorite),
                
            }
            
        }
        //return state.concat(action.payload)
      case CLEAR_FAVORITE:
        return initFav;
    default:
        
        return state;
    }
    
}

function reducerCart( state = initProduct, action){
    
    switch(action.type){

        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart==0){
                let cart = {
                    id: action.payload.id,
                    quantity:1,
                    name: action.payload.name,
                    url: action.payload.url,
                    price: action.payload.price,
                    type: action.payload.type,
                    color: action.payload.color,
                    size: action.payload.size,
                    //info: action.payload.info
                } 
                state.Carts.push(cart); 
                 
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item.id==action.payload.id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload.id,
                        quantity:1,
                        name:action.payload.name,
                        url:action.payload.url,
                        price:action.payload.price,
                        type: action.payload.type,
                        color: action.payload.color,
                        size: action.payload.size,
                        //info:action.payload.info
                    }
                    state.Carts.push(_cart);
                }
            }
            //saveCart({...state,numberCart:state.numberCart+1});
            return{
                ...state,
                numberCart:state.numberCart+1,
                
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
                //saveCart({...state});
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
                //saveCart({...state});
                return{
                    ...state
                }
            case DELETE_CART:
                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart: state.numberCart - quantity_,
                    Carts: state.Carts.filter(item =>{
                        return item.id !== state.Carts[action.payload].id
                    })
                }
            case RESET_STORE:
                
                return {
                    Carts: [],
                    numberCart: state.numberCart=0,
            }
        default:
            
            return state;
    }
}


export default  combineReducers({
    //history: historicNames,
    cartStore: reducerCart,
    favourites: favoriteReducer,

  })




