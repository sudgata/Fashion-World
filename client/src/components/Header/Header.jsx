import React, { useState } from 'react';
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
import { ReactComponent as  HamBurgerIcon } from '../../assets/icons/hamburger-icon.svg';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({ currentUser, hidden, history, setUserLoaded }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    return (
        <>
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar}/>
        <div className='header-wrapper'>
            <HamBurgerIcon className='hamburger-icon' onClick={toggleSidebar}/>
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
        </div>
        </>
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