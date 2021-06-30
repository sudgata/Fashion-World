import React from 'react';
import { useHistory } from 'react-router';
import './Sidebar.scss'

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const history = useHistory();
    return (
        <>
            {showSidebar && <div className='overlay' onClick={toggleSidebar}></div>}
            <div className={showSidebar ? 'sidebar-container active': 'sidebar-container'}>
            <div className='sidebar-header'>
                <div onClick={toggleSidebar} className='sidebar-close-btn'>&#10006;</div>
            </div>
            <ul onClick={toggleSidebar}>
                <li onClick={()=>{
                    history.push('/');
                }}>
                    Home
                </li>
                <li onClick={()=>{
                    history.push('/orders');
                }}>
                    Orders
                </li>
                <li>About</li>
                <li>Log out</li>
            </ul>
            </div>
        </>
    );
};

export default Sidebar;