import React, { useState } from 'react';
import './OrderItem.scss';

const OrderItem = (props) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () =>{
        setExpanded(!expanded);
    }
    return (
        <div>
            <div className='order-item-container' onClick = {toggleExpanded}>
                <div className='order-details'>
                    <div className='order-name'>Blue Tshirt, Green Tshirt and 3 others</div>
                    <div className='order-price'>  ₹4500</div>
                    <div className='order-time'>  Ordered on: <br/> 24th June</div>
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
                            <span style={{fontWeight:'bold'}}>Items:</span>
                            <span>Brown hat - 1 * ₹20</span>
                            <span>Green Pant - 1 * ₹20</span>
                            <span>White Tshirt - 1 * ₹20</span>
                        </div>
                        <div className='address-container'>
                            <span style={{fontWeight:'bold'}}>Ship To:</span>
                            <span>Shubhakanta Udgata</span>
                            <span>29, Shantinikethan Layout, SGR Dental Collecge Road,Munekolala,Marathalli</span>
                            <span>{null}</span>
                            <span>Bangalore-560037</span>
                            <span>India</span>
                        </div>
                    </div>
                )
            }
            
        </div>
        
    );
}

export default OrderItem;