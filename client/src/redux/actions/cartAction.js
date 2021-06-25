import { addItemToCart, removeItemToCart } from '../../api/cart-api';
import { cartActionTypes } from '../types/cartTypes';

export const toggleCartHidden = () =>({
    type: cartActionTypes.TOGGLE_CART_HIDDEN
});

export const setCartItems = ( cartItems ) =>({
    type: cartActionTypes.SET_CARTITEMS,
    payload: cartItems
});

// export const addItem = ( item ) =>({
//     type: cartActionTypes.ADD_ITEM,
//     payload: item
// });

export const addItem = ( userId, productId ) =>{
    return async(dispatch) =>{
        dispatch({
            type: cartActionTypes.ADD_ITEM
        });
        const cartItems = await addItemToCart(userId, productId);
        dispatch(
            setCartItems(cartItems)
        )
    }
}

// export const removeItem = ( item ) =>({
//     type: cartActionTypes.REMOVE_ITEM,
//     payload: item
// });

export const removeItem = ( userId, productId ) =>{
    return async(dispatch) =>{
        dispatch({
            type: cartActionTypes.REMOVE_ITEM
        });
        const cartItems = await removeItemToCart(userId, productId, false);
        dispatch(
            setCartItems(cartItems)
        )
    }
}

// export const clearItemFromCart = ( item ) =>({
//     type: cartActionTypes.CLEAR_ITEM_FROM_CART,
//     payload: item
// });
export const clearItemFromCart = ( userId, productId ) =>{
    return async(dispatch) =>{
        dispatch({
            type: cartActionTypes.CLEAR_ITEM_FROM_CART
        });
        const cartItems = await removeItemToCart(userId, productId, true);
        dispatch(
            setCartItems(cartItems)
        )
    }
}
