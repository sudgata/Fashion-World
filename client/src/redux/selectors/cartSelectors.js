import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartLoading = createSelector(
    [selectCart],
    cart => cart.loading
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>cartItems.reduce((totalCount, item)=> totalCount + item.quantity, 0)
);

export const selectCartItemsTotalPrice = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((totalPrice, item)=> totalPrice + (item.quantity * item.product.price), 0)
);