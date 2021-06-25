import axios from 'axios';
import { auth } from '../firebase/firebase.util'; 

const baseUrl = 'http://localhost:5000/user';


const createheaders = async ()=>{
    let accessToken = await auth.currentUser.getIdToken();
    return {
        'x-access-token': accessToken
    }
}

export const addUser = async (user) =>{
    if(!user) return;
    try{
        let headers = await createheaders();
        let { data: newUser } = await axios.post(`${baseUrl}/new`,user,{ headers: headers});
        return newUser;
    }
    catch(err){
        console.log(err);
    }
} 