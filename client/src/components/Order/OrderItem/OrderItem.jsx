import React, { useState } from 'react';
import newIcon from '../../../assets/icons/new-badge.png';
import './OrderItem.scss';

const OrderItem = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () =>{
        setExpanded(!expanded);
    }
    const compareDates =(orderTime) =>{
        const orderDate= new Date(orderTime).getDate();
        const currentDate= new Date().getDate();
        return orderDate === currentDate;
    }

    let orderedDay,name,isNew=false;

    if(order){
        orderedDay = new Date(order?.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        isNew = compareDates(order?.createdAt);
        const orderItemsLength = order?.orderItems?.length;
        if(orderItemsLength === 1){
            name = order?.orderItems[0]?.product?.name;
        }
        else if(orderItemsLength > 1){
            name = orderItemsLength === 2 ? `${order?.orderItems[0]?.product?.name},  ${order?.orderItems[0]?.product?.name}`:
                                            `${order?.orderItems[0]?.product?.name},  ${order?.orderItems[1]?.product?.name} and ${orderItemsLength-2} Others`
        }
    }

    return (
        <div>
            <div className='order-item-container' onClick = {toggleExpanded}>
                <div className='order-details'>
                    <div className='order-status'>
                        {isNew && <img className='order-status-img' src={newIcon} alt="no icon" />}
                    </div>
                    <div className='order-name'>{name}</div>
                    <div className='order-price'>₹{order.totalPrice}</div>
                    <div className='order-time'>  Ordered on: <br/> {orderedDay} </div>
                </div>
                <div className='action-items'>
                    {
                        expanded ?
                        (
                            <div className='minus-button'>&#8722;</div>
                        ):(
                            <div className='plus-button'>&#65291;</div>
                        )
                    }
                </div>
            </div>
            {
                expanded &&
                (
                    <div className='accordion-content'>
                        <div className='productlist-container'>
                            <span  className= 'accordion-content-header'>Items:</span>
                            <div className='accordion-content-details'>
                                {
                                    order?.orderItems?.map((item)=>(
                                        <span key={item.id}>{item?.product?.name} - {item?.quantity} * ₹{item.product.price}</span>
                                    ))
                                }
                                {/* <span>Brown hat - 1 * ₹20</span>
                                <span>Green Pant - 1 * ₹20</span>
                                <span>White Tshirt - 1 * ₹20</span> */}
                            </div>
                        </div>
                        <div className='address-container'>
                            <span className= 'accordion-content-header'>Ship To:</span>
                            <div className='accordion-content-details'>
                                <span>{order.shippingAddress.name}</span>
                                <span>{order?.shippingAddress?.addressLine1}</span>
                                <span>{order?.shippingAddress?.addressLine2}</span>
                                <span>{order?.shippingAddress?.city} - {order?.shippingAddress?.postalCode}</span>
                                <span>{order?.shippingAddress?.country}</span>
                            </div>
                        </div>
                    </div>
                )
            }   
            
        </div>
        
    );
}

export default OrderItem;