import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as GoogleIcon  } from '../../assets/icons/google-signin-icon.svg';
import CustomSpinner from '../../components/Common/CustomSpinner/CustomSpinner';
import { auth, signInWithGoogle } from '../../firebase/firebase.util';
import { setUserLoaded } from '../../redux/actions/userAction';
import './Login.scss';

const Login = ({ setUserLoaded }) => {

    const [loading, setLoading] = useState(false);
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;
    const history = useHistory();
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            setLoading(true);
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({ email: '', password: ''});
            setLoading(false);
            setUserLoaded(true);
            history.push('/');
        }
        catch(err){
            setLoading(false);
            alert(err.message);
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
                    <button  type="submit" className={`${loading ? 'disabled-submit-button' : null } submit-button`} disabled={loading}>
                        {loading ? <CustomSpinner />: <span>Login</span>}
                    </button>
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

const mapDispathToProps= (dispatch)=>{
    return{
        setUserLoaded: (isLoaded)=> dispatch(setUserLoaded(isLoaded))
    }
}

export default connect(null,mapDispathToProps)(Login);