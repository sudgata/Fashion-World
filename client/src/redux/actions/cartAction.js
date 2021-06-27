import { addItemToCart, removeItemToCart } from '../../api/cart-api';
import { cartActionTypes } from '../types/cartTypes';

export const toggleCartHidden = () =>({
    type: cartActionTypes.TOGGLE_CART_HIDDEN
});

export const setCartItems = ( cartItems ) =>({
    type: cartActionTypes.SET_CARTITEMS,
    payload: cartItems
});


export const addItem = ( userId, productId ) => {
    return async(dispatch) =>{
        try{
            dispatch({
                type: cartActionTypes.ADD_ITEM
            });
            const cartItems = await addItemToCart(userId, productId);
            dispatch(
                setCartItems(cartItems)
            );
        }
        catch(err){
            console.log(err);
            dispatch({
                type: cartActionTypes.CART_CHANGE_ERROR
            });
        }  
    }
}


export const removeItem = ( userId, productId ) => {
    return async(dispatch) =>{
        try{
            dispatch({
                type: cartActionTypes.REMOVE_ITEM
            });
            const cartItems = await removeItemToCart(userId, productId, false);
            dispatch(
                setCartItems(cartItems)
            );
        }
        catch(err){
            console.log(err);
            dispatch({
                type: cartActionTypes.CART_CHANGE_ERROR
            });
        }
    }
}

export const clearItemFromCart = ( userId, productId ) => {
    return async(dispatch) =>{
        try{
            dispatch({
                type: cartActionTypes.CLEAR_ITEM_FROM_CART
            });
            const cartItems = await removeItemToCart(userId, productId, true);
            dispatch(
                setCartItems(cartItems)
            );
        }
        catch(err){
            console.log(err);
            dispatch({
                type: cartActionTypes.CART_CHANGE_ERROR
            });
        }
    }
}
