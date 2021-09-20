import {GET_NUMBER_CART,ADD_CART,ADD_FAVORITE, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART, REMOVE_FAVORITE} from  './action';
import { combineReducers } from 'redux';

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
            return{
                ...state,
                favoriteProduct: updateFav
            }
        } else {
            const favorite = action.payload
            return {
                ...state,
                favoriteProduct: state.favoriteProduct.concat(favorite)
            }
        }
        //return state.concat(action.payload)
      case REMOVE_FAVORITE:
        return state.filter(favorite => favorite.id !== action.payload.id)
    
    default:
        return state;
    }
    
}

function reducerCart(state = initProduct,action){
    switch(action.type){

        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart==0){
                let cart = {
                    id:action.payload.id,
                    quantity:1,
                    name:action.payload.name,
                    url:action.payload.url,
                    price:action.payload.price,
                    type: action.payload.type,
                    color: action.payload.color,
                    size: action.payload.size,
                    info:action.payload.info
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
                        info:action.payload.info
                    }
                    state.Carts.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
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
        
        default:
            return state;
    }
}

{
    /**
     const ShopApp = combineReducers({
    StoreProduct:reducer,
    Favorites:favoriteReducer
});
export default ShopApp;
     */
}
export default combineReducers({
    //history: historicNames,
    cartStore:reducerCart,
    favourites: favoriteReducer,
    //currentName: currentNameReducer,
    //filters: filtersReducer,
  })




