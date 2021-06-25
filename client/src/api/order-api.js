import axios from 'axios';
import { auth } from '../firebase/firebase.util'; 

const baseUrl = 'http://localhost:5000/order';


const createheaders = async ()=>{
    let accessToken = await auth.currentUser.getIdToken();
    return {
        'x-access-token': accessToken
    }
}

export const createOrder = async (paymentResponse, totalPrice, cartItmes, userId) =>{

    if(!paymentResponse || !userId || !cartItmes) return;
    try{
        let headers = await createheaders();
        const payment = paymentResponse?.source;
        const address = {
            name: payment?.name,
            phone : payment?.phone ?? null,
            addressLine1: payment?.address_line1,
            addressLine2: payment?.address_line2,
            city: payment?.address_city,
            country: payment?.address_country,
            postalCode: payment?.address_zip
        }
        const orderItems = cartItmes?.map((item)=>({
            product: item.product.id,
            quantity: item.quantity
        }))
        let body = {
            totalPrice,
            paymentId: payment?.id,
            cardType: payment?.brand,
            lastFourDigits: payment?.last4,
            shippingAddress : address,
            billingAddress : address,
            orderItems,
            user: userId
        }
        console.log(body);
        let { data: newOrder } = await axios.post(`${baseUrl}/new`,body,{ headers });
        return newOrder;
    }
    catch(err){
        console.error(err);
        throw "Order Creation Failed " + err.response;
    }
}

export const getOrdersForUser = async(userId) =>{
    if(!userId) return;
    try{
        let headers = await createheaders();
        const { data: orders } = await axios.get(`${baseUrl}/${userId}`,{ headers });
        return orders;
    }
    catch(err){
        console.log(err);
    }
}