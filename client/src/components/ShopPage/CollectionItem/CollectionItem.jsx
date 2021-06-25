import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { addItem } from '../../../redux/actions/cartAction';
import { selectCurrentUser } from '../../../redux/selectors/userSelectors';
import './CollectionItem.scss'

const CollectionItem = ({ item , addItem, currentUser }) => {
    const { id: productId, name, price, imageUrl } = item;
    const history = useHistory();

    const addToCart = ( userId, productId ) => {
        if(!currentUser){
            alert("Please login to continue!")
            history.push('/login');
        }
        else
            addItem(userId, productId)
    }
    return (
        <div className='collection-item'>
            <div className='image' style={{backgroundImage: `url(${imageUrl})`}}></div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </div>
            <button  className='cart-button' type='button' onClick={()=>addToCart(currentUser?.uid, productId)}>ADD TO CART</button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

const mapDispathToProps = dispatch =>{
    return {
        addItem: (userId, productId)=> dispatch(addItem(userId, productId))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(CollectionItem);