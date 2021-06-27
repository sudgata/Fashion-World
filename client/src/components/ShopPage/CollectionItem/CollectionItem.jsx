import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { addItem } from '../../../redux/actions/cartAction';
import { selectCartLoading } from '../../../redux/selectors/cartSelectors';
import { selectCurrentUser } from '../../../redux/selectors/userSelectors';
import CustomSpinner from '../../Common/CustomSpinner/CustomSpinner';
import './CollectionItem.scss'

const CollectionItem = ({ item , addItem, currentUser, loading }) => {
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
                <span>{name}</span>
                <span >₹{price}</span>
            </div>
            <button  className={`${loading ? 'cart-button-loading':''} cart-button`} type='button' disabled={loading} onClick={()=>addToCart(currentUser?.uid, productId)}>
                {loading ? <CustomSpinner height='40' width='40'/> : <span>ADD TO CART</span>}
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    loading: selectCartLoading(state)
});

const mapDispathToProps = dispatch =>{
    return {
        addItem: (userId, productId)=> dispatch(addItem(userId, productId))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(CollectionItem);