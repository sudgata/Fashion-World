import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCartItems } from '../../../redux/selectors/cartSelectors';
import { toggleCartHidden } from '../../../redux/actions/cartAction';
import CartItem from '../../Cart/CartItem/CartItem';
import './CartDropdown.scss';

const CartDropdown = ( { cartItems, history, dispatch } )=>(
    <div className='cart-dropdown-container'>
        <div className='cart-dropdown-items'>
            {
                cartItems.length ? (
                    cartItems.map(item=>(
                        <CartItem key={item.id} item={item}/>
                    ))
                ) : (
                    <span className='empty-cart-message'>Your cart is empty</span>
                )
            }
        </div>
        <button className='add-to-cart-button' type='button' onClick={()=>{
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}> GO TO CHECKOUT</button>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems : selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));