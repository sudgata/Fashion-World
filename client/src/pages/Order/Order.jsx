import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import OrderItem from '../../components/Order/OrderItem/OrderItem';
import { getOrdersForUser } from '../../api/order-api';
import './Order.scss';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import Spinner from '../../components/Common/Spinner/Spinner';

const Order = ({ currentUser, history }) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async() =>{
            try{
                setLoading(true);
                const orders= await getOrdersForUser(currentUser?.uid); 
                if(orders) setOrders(orders);
                setLoading(false);
            }
            catch(err){
                console.log(err);
                setLoading(false);
            }
        }
        if(currentUser?.uid)
            fetchOrders();
        else
            setLoading(false);
    },[currentUser?.uid])

    return(
        <React.Fragment>
            <div>
                <div className='order-header'>
                    Orders
                </div>
                {
                    loading ? <Spinner/> :
                    (
                        orders.length === 0 && !loading ? (
                            <div className='no-order-item'>
                                <span>No orders found. Please shop to continue.</span>
                                <div>
                                    <button type='button' className='shop-button' onClick={()=>history.push('/')}>Continue Shopping</button>
                                </div>
                            </div> 
                        ) :
                        (<div className='order-container'>
                            {
                                orders.map((order)=>(
                                    <OrderItem key={order.id} order={order}/>
                                ))
                            }
                        </div>)
                    )
                }
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(Order);