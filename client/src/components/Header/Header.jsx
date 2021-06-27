import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase.util';
import { connect } from 'react-redux';
import './Header.scss';
import CartIcon from './CartIcon/CartIcon'; 
import CartDropdown from './CartDropdown/CartDropdown';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { selectCartHidden } from '../../redux/selectors/cartSelectors';
import { createStructuredSelector } from 'reselect';
import { setUserLoaded } from '../../redux/actions/userAction';

const Header = ({ currentUser, hidden, history, setUserLoaded }) => {
    return (
        <div className='header-container'>
            <Link to='/' className='app-title'>
                <span className='title-text'>Fashion World</span>
            </Link>
            <div className='header-menu-container'>
                <Link to='/shop' className='header-menu'>SHOP</Link>
                {
                    currentUser ?
                    (<div className='header-menu' onClick={async ()=>{
                        await auth.signOut();
                        setUserLoaded(false);
                        history.push('/login');
                        }}>
                        LOG OUT
                    </div>):
                    (<Link to='/login' className='header-menu'>LOGIN</Link>)
                }
                <Link to='/orders' className='header-menu'>ORDERS</Link>
                <CartIcon/>
            </div>
            {
                hidden ? null: <CartDropdown/>
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispathToProps= (dispatch)=>{
    return{
        setUserLoaded: (isLoaded)=>dispatch(setUserLoaded(isLoaded))
    }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Header));