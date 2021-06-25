import axios from 'axios';
import { auth } from '../firebase/firebase.util'; 

const baseUrl = 'http://localhost:5000/pay';


const createheaders = async ()=>{
    let accessToken = await auth.currentUser.getIdToken();
    return {
        'x-access-token': accessToken
    }
}

export const processPaymennt = async (token, amount) =>{
    if(!token || !amount) return;
    try{
        let headers = await createheaders();
        let body = {
            tokenId: token.id,
            amount: amount
        }
        let { data: newUser } = await axios.post(`${baseUrl}/new`,body,{ headers: headers});
        return newUser;
    }
    catch(err){
        console.error(err);
        throw err.response.data.strErr.raw?.message;
    }
} 