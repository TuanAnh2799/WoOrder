import {GET_NUMBER_CART,ADD_CART,ADD_FAVORITE, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART,
     CLEAR_FAVORITE, RESET_STORE, SET_USER_LOGIN, SET_USER_REGISTER, SET_USER_LOGOUT, SET_PRODUCT, DELETE_PRODUCT, SET_FAVORITE } from  './action';
import { combineReducers } from 'redux';
import { ToastAndroid } from 'react-native';



const initProduct = {
    numberCart: 0,
    Carts:[],
}

const initUser = {
    User : null,
}

const initListProduct = {
    Product : null,
}

function reducerProduct( state = initListProduct, action){
    
    switch(action.type){

        case SET_PRODUCT:
            let product = action.payload
            //console.log('Product bên reducer nhận đc:',product);
            return {
                Product: product
            }  
        case DELETE_PRODUCT:
            let id = action.payload
            if(state.Product != null)
            {
                return{
                    ...state,
                    Product: state.Product.filter(item =>{
                        return item.id !== id
                    })
                }
            }
            return {
                ...state
            } 
        default:
            return state;
    }
}

function reducerAuth( state = initUser, action){
    
    switch(action.type){

        case SET_USER_LOGIN:
            let user = action.payload
            console.log('data bên reducer nhận đc:',user);
            return {
                User: user
            }  

        case SET_USER_REGISTER:
            let userRegister = action.payload
            console.log('register bên reducer nhận đc:',userRegister)
            return {
                User: userRegister
            }
            
        case SET_USER_LOGOUT:
            return {
                User: null
            }
        default:
            return state;
    }
}

const initFav = {
    favoriteProduct: []
}
const favoriteReducer = (state =initFav, action) => {
    
    switch (action.type) {
    
    case SET_FAVORITE:
        let fav = action.payload;
            console.log('data bên reducer nhận đc:',fav);
            return {
                favoriteProduct: fav
            } 

    case ADD_FAVORITE:
        let idSP = action.payload;
        const indexExit = state.favoriteProduct.findIndex(fav => fav == action.payload)
        if(indexExit >= 0){
            //const updateFav = [...state.favoriteProduct]
            let remove = state.favoriteProduct.filter( id => {
                return id != idSP;
            })
            // const remove = updateFav.map(item => {
            //     return item
            // }).indexOf(action.payload.id)
            // updateFav.splice(remove,1) // xóa 1 phần tử remove trong array
            ToastAndroid.show("Đã xóa khỏi mục yêu thích.", ToastAndroid.SHORT)
            return{
                ...state,
                favoriteProduct: remove
            }
        } else {
            let favorite = action.payload;
            state.favoriteProduct.push(favorite);
            ToastAndroid.show("Đã thêm vào mục yêu thích.", ToastAndroid.SHORT)
            return {
                ...state,
                
            }
            
        }
        //return state.concat(action.payload)
    case CLEAR_FAVORITE:
        return {
            favoriteProduct:[],
        }
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
    userState: reducerAuth,
    cartStore: reducerCart,
    favourites: favoriteReducer,
    productStore: reducerProduct,

  })




