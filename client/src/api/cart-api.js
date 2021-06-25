import axios from 'axios';
import { auth } from '../firebase/firebase.util'; 

const baseUrl = 'http://localhost:5000/cart';


const createheaders = async ()=>{
    let accessToken = await auth.currentUser.getIdToken();
    return {
        'x-access-token': accessToken
    }
}

export const addItemToCart = async (userId, productId) =>{
    if(!userId || !productId) return;
    try{
        let headers = await createheaders();
        const body = {
            userId, 
            productId
        }
        let { data: cartItems } = await axios.post(`${baseUrl}/add`,body,{ headers: headers});
        return cartItems;
    }
    catch(err){
        console.log(err);
    }
}


export const removeItemToCart = async (userId, productId, clear) =>{
    if(!userId || !productId) return;
    try{
        let headers = await createheaders();
        const body = {
            userId, 
            productId,
            clear
        }
        let { data: cartItems } = await axios.post(`${baseUrl}/remove`,body,{ headers: headers});
        return cartItems;
    }
    catch(err){
        console.log(err);
    }
}

export const clearAllCart = async (userId) =>{
    if(!userId) return;
    try{
        let headers = await createheaders();
        const body = {
            userId
        }
        let { data: cartItems } = await axios.post(`${baseUrl}/clearAll`,body,{ headers: headers});
        return cartItems;
    }
    catch(err){
        console.log(err);
    }
}