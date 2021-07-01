import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { auth } from '../../firebase/firebase.util';
import './Sidebar.scss'

const Sidebar = ({ showSidebar, toggleSidebar, currentUser }) => {
    const history = useHistory();
    return (
        <>
            {showSidebar && <div className='overlay' onClick={toggleSidebar}></div>}
            <div className={showSidebar ? 'sidebar-container active': 'sidebar-container'}>
            <div className='sidebar-header'>
                        {currentUser ? (<div className='sidebar-user'>
                            Hello,<br/> {currentUser?.displayName}
                        </div>):
                        (<div>
                            <div className='sidebar-login-button' onClick={()=>{
                                    toggleSidebar();
                                    history.push('/login')
                                }}>
                                Login/Register
                            </div>
                        </div>)
                        }
                <div onClick={toggleSidebar} className='sidebar-close-btn'>
                    &#10006;
                </div>
            </div>
            <ul onClick={toggleSidebar}>
                <li onClick={()=>{
                    history.push('/');
                }}>
                    Home
                </li>
                <li onClick={()=>{
                    history.push('/shop');
                }}>
                    Shop
                </li>
                {currentUser && <li onClick={()=>{
                    history.push('/orders');
                }}>
                   My Orders
                </li>}
                {currentUser && <li onClick={()=>{
                    history.push('/checkout');
                }}>
                   My Cart
                </li>}
                {currentUser && <li onClick={async()=>{
                    await auth.signOut();
                    history.push('/login');
                }}>
                    Log out
                </li>}
                <li>About</li>
            </ul>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(Sidebar);