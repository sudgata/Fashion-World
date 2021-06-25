import React from 'react';
import './CartItem.scss';

const CartItem = ({ item }) => {
    return (
        <div className='cart-item-container'>
            <img src={item.product.imageUrl} alt="item" />
            <div className='cart-item-details'>
                <span className="item-name">{item.product.name}</span>
                <span className="item-price">{item.quantity} x ${item.product.price}</span>
            </div>
        </div>
    );
};

export default CartItem;