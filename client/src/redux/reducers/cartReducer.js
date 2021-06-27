import { cartActionTypes } from '../types/cartTypes';
//import { addItemToCart, removeItemFromCart } from '../utils/cartUtil';

const INITIAL_STATE= {
    hidden: true,
    loading: false,
    error: false,
    cartItems: []
}

const cartReducer =(state = INITIAL_STATE, action)=>{
    const { type, payload } = action;
    switch(type){
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionTypes.SET_CARTITEMS:
            return {
                ...state,
                loading: false,
                error: false,
                cartItems: payload
            }
        // case cartActionTypes.ADD_ITEM:
        //     return {
        //         ...state,
        //         cartItems: addItemToCart(state.cartItems,payload)
        //     }
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                loading: true
            }
        // case cartActionTypes.REMOVE_ITEM:
        //     return {
        //         ...state,
        //         cartItems: removeItemFromCart(state.cartItems,payload)
        //     }
        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                loading: true
            }
        // case cartActionTypes.CLEAR_ITEM_FROM_CART:
        //     return {
        //         ...state,
        //         cartItems: state.cartItems.filter((item)=> item.id !== payload.id)
        //     }
        case cartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                loading: true
            }
        case cartActionTypes.CART_CHANGE_ERROR:
            return{
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}

export default cartReducer;