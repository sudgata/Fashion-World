import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingCartIcon } from '../../../assets/icons/shopping-cart-golden.svg';
import { toggleCartHidden } from '../../../redux/actions/cartAction';
import { selectCartItemsCount } from '../../../redux/selectors/cartSelectors';
import './CartIcon.scss';

const CartIcon=({ itemCount, toggleCartHidden })=> {
    return (
        <div className='cart-icon-container' onClick={toggleCartHidden}>
            <ShoppingCartIcon className='cart-icon'/>
            <span className='item-count'>{itemCount}</span>
        </div>
    );
}

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});

const mapDispathToProps = (dispatch) =>({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps,mapDispathToProps)(CartIcon);




