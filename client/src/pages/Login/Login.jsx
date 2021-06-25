import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon  } from '../../assets/icons/google-signin-icon.svg';
import { auth, signInWithGoogle } from '../../firebase/firebase.util';
import './Login.scss';

const Login = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({ email: '', password: ''});
        }
        catch(err){
            console.log(err);
        }
    }

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setUserCredentials({...userCredentials,[name] : value})
    }

    return (
        <div>
            <h1 className="header-login">Login</h1>
            <div className="login-form">
            <form onSubmit={handleSubmit}>
            <div className='login-container'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password "  value={password} onChange={handleChange} required/>
                <div className="login-footer">
                    <button  type="submit" className="submit-button">Login</button>
                    <button type='button' className="submit-button google-signin-button" onClick={signInWithGoogle}>
                        <div className="google-signin-container">
                            <GoogleIcon/>&nbsp;
                            <span>Login with Google</span>
                        </div> 
                    </button>
                    <span style={{fontSize:"22px"}}>Need an Account ? Register <Link  className="underline-anchor" to='/signup'>here</Link></span>
                </div>
            </div>
            </form>
            </div>
        </div>
        
        );
}

export default Login;