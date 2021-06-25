export const addItemToCart = (cartItems, newItem) => {
    const existingCartItem = cartItems.find(item => item.id === newItem.id);
    if(existingCartItem){
       return cartItems.map(item =>{
            if(item.id === newItem.id)
                return {...item, quantity: item.quantity + 1}
            else
                return item;
        });
    }
    return [...cartItems,{...newItem,quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      item => item.id === cartItemToRemove.id
    );
  
    if (existingCartItem.quantity === 1) {
      return cartItems.filter(item => item.id !== cartItemToRemove.id);
    }
  
    return cartItems.map(item =>
      item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
}