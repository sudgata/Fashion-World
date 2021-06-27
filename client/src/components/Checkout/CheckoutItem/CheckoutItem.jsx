import React from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem, clearItemFromCart } from '../../../redux/actions/cartAction';
import { selectCartLoading } from '../../../redux/selectors/cartSelectors';
import { selectCurrentUser } from '../../../redux/selectors/userSelectors'
import './CheckoutItem.scss'

const CheckoutItem = ({ item, dispatch, currentUser, loading }) => {
    return (
        <div>
            <div className='checkoutitem-container'>
            <img className='checkout-img' src={item.product.imageUrl} alt="item" />
            <div className='checkout-product'>
                <div className='checkout-product-details'>
                    <span>{item.product.name}</span>
                    <span>₹{item.product.price}</span>
                    <div>
                        <button type='button' className='plus-minus-button-loading plus-minus-button' disabled={loading}
                         onClick={()=>dispatch(removeItem(currentUser?.uid, item?.product?.id))}
                        >
                            <span className='decrease-item-quantity'>-</span>
                        </button>
                        <span style={{fontSize: '25px'}}>{item.quantity}</span>
                        <button type='button' className='plus-minus-button-loading plus-minus-button' disabled={loading}
                         onClick={()=>dispatch(addItem(currentUser?.uid, item?.product?.id))}
                        >
                            <span className='increase-item-quantity'>+</span>
                        </button>
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
    currentUser: selectCurrentUser(state),
    loading: selectCartLoading(state)
});

export default connect(mapStateToProps)(CheckoutItem);