import React from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem, clearItemFromCart } from '../../../redux/actions/cartAction';
import { selectCurrentUser } from '../../../redux/selectors/userSelectors'
import './CheckoutItem.scss'

const CheckoutItem = ({ item, dispatch, currentUser }) => {
    return (
        <div>
            <div className='checkoutitem-container'>
            <img className='checkout-img' src={item.product.imageUrl} alt="item" />
            <div className='checkout-product'>
                <div className='checkout-product-details'>
                    <span>{item.product.name}</span>
                    <span>${item.product.price}</span>
                    <div>
                        <span className='decrease-item-quantity' onClick={()=>dispatch(removeItem(currentUser?.uid, item?.product?.id))}>-  </span>
                        <span style={{fontSize: '22px'}}>{item.quantity}</span>
                        <span className='increase-item-quantity' onClick={()=>dispatch(addItem(currentUser?.uid, item?.product?.id))}>  +</span>
                    </div>
                </div>
                <div className='remove-item'>
                    <span style={{cursor: 'pointer'}} onClick={()=>dispatch(clearItemFromCart(currentUser?.uid, item?.product?.id))}>&#10006;</span>
                </div>
            </div>
            </div>
            <hr style={{opacity: 0.5}} />
        </div>
        
    );
};

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(CheckoutItem);