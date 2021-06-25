import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/Checkout/CheckoutItem/CheckoutItem';
import StripeButton from '../../components/Checkout/StripeButton/StripeButton';
import { selectCartItems, selectCartItemsTotalPrice } from '../../redux/selectors/cartSelectors';
import { processPaymennt } from '../../api/payment-api';
import './Checkout.scss';
import { selectCurrentUser } from '../../redux/selectors/userSelectors';
import { createOrder } from '../../api/order-api';

const Checkout = ({ cartItems, totalPrice, currentUser, history }) => {

    const handlePaymentAndOrder = async(token, amount) =>{

        try{
            const paymentResponse =await pay(token, amount);
            //console.log(paymentResponse);
            alert("Your Payment is successful!");
            const orderResponse = await createOrder(paymentResponse?.strRes, totalPrice, cartItems, currentUser?.uid);
            console.log(orderResponse);

        }
        catch(err){
            alert(err);
        }

    }

    const pay = async (token, amount) =>{
        try{
            const paymentResponse = await processPaymennt(token, amount);
            return paymentResponse;
        }
        catch(err){
            throw new Error(`Payment Failed!" \n ${err}`);
        }
    }

    return (
        <div>
            <div className='checkout-header'>
                My Cart 
            </div>
            
            <div className='checkout-container'>
                {
                    cartItems.length ? 
                    (
                        <div>
                            <div className='card-details-text'>
                                <span>*Please use this test card for payments - 4242 4242 4242 4242 - Exp: any future date - CVV: any 3 digit number*</span>
                            </div>
                            {cartItems.map(item=>(
                                <CheckoutItem key={item.id} item={item}/>
                            ))}
                        </div> 
                    ) :
                    (
                        <div className='no-checkoutitem'>
                            <span>Your Cart is empty. Please add items to continue.</span>
                            <div>
                                <button type='button' className='shop-button' onClick={()=>history.push('/')}>Continue Shopping</button>
                            </div>
                        </div> 
                    )
                }
            </div>
            {
                cartItems.length ? (
                    <div className='total-price-container'>
                        <div className='total-price-flex'>
                            <span>TOTAL:${totalPrice}</span>
                            <StripeButton price={totalPrice} handlePaymentAndOrder={handlePaymentAndOrder}/>
                        </div>
                    </div> 
                ) : null
                
            }
            
        </div>       
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectCartItemsTotalPrice,
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Checkout);