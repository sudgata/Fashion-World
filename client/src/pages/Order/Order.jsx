import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OrderItem from '../../components/Order/OrderItem/OrderItem';
import { getOrdersForUser } from '../../api/order-api';
import './Order.scss';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';

const Order = ({ currentUser }) => {
    useEffect(()=>{
        const fetchOrders = async() =>{
            const orders= await getOrdersForUser(currentUser?.uid);
            console.log(orders);
        }
        fetchOrders();
    },[currentUser.uid])
    return (
        <div>
            <div className='order-header'>
                Orders
            </div>
            <div className='order-container'>
                <OrderItem key='1'/>
                <OrderItem key='2'/>
                <OrderItem key='3'/>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(Order);