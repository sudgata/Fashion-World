import React from 'react';
import StripeChcekout from 'react-stripe-checkout';
import './StripeButton.scss';

const StripeButton = ({ price, handlePaymentAndOrder }) => {
    const priceForStripe = price * 100;
    const publishableKey= "pk_test_51IzNT3SFvXMxLHiabP6JXuoCdOlZ4LVCQD3oD3HV6iko1fDn5yv6wcbSntfD9Bz6j2RGhzkrlfhfOE6mtVCKze4V00R3L3frXu";
    const onToken = async (token) =>{
        handlePaymentAndOrder(token, priceForStripe);
        // try{
        //     const paymentResponse =await pay(token, priceForStripe);
        //     console.log(paymentResponse);
        //     alert("Your Payment is successful!");
        // }
        // catch(err){
        //     alert(err);
        // }

    }

    // const pay = async (token, amount) =>{
    //     try{
    //         const paymentResponse = await processPaymennt(token, amount);
    //         return paymentResponse;
    //     }
    //     catch(err){
    //         throw new Error(`Payment Failed!" \n ${err}`);
    //     }
    // }
    return (
        <div>
            <StripeChcekout
                label='Pay Now'
                name='Fashion World'
                ComponentClass='div'
                billingAddress
                shippingAddress
                description={`your total price to pay is ₹${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                stripeKey={publishableKey}
                token={onToken}>
                <button className="payment-button">
                    Pay Now
                </button>
            </StripeChcekout>
        </div>
    );
};

export default StripeButton;