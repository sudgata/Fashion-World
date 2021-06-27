import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase.util';
import { addUser } from '../../api/user-api';
import './SignUp.scss';
import { connect } from 'react-redux';
import { setCurrentUser, setUserLoaded } from '../../redux/actions/userAction';
import CustomSpinner from '../../components/Common/CustomSpinner/CustomSpinner';

const SignUp = ({ setCurrentUser, setUserLoaded }) => {
    const [loading, setLoading] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password , confirmPassword} = signUpData;
    const history = useHistory();

    const handleSubmit =async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match!");
            return;
        }

        try{
            setLoading(true);
            await auth.createUserWithEmailAndPassword(email, password);
            setSignUpData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }) ;
            const currentUser = auth.currentUser;
            await currentUser.updateProfile({ displayName: name});
            const updatedUser = auth.currentUser;
            const userReq= {
                uid: updatedUser.uid,
                email: updatedUser.email,
                displayName: updatedUser.displayName
            }
            await addUser(userReq);
            setCurrentUser(userReq);
            setLoading(false);
            setUserLoaded(true);
            history.push('/');
        }
        catch(err){
            console.log(err);
        }
    }

    const handleChange =(event) =>{
        const { name, value } = event.target;
        setSignUpData({...signUpData, [name]: value});
    }

    return (
        <div>
        <h1 className="header-signup">Create New Account</h1>
        <div className="signup-form">
        <form onSubmit={handleSubmit}>
        <div className='signup-container'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name} onChange={handleChange} required/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChange} required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password "  value={password} onChange={handleChange} required/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword "  value={confirmPassword} onChange={handleChange} required/>
            <div className="signup-footer">
                <button  type="submit" className="signup-submit-button" disabled={loading}>
                {loading ? <CustomSpinner />: <span>Register</span>}
                </button>
                <span style={{fontSize:"22px"}}>Already have an Account ? Login <Link  className="underline-anchor" to='/login'>here</Link></span>
            </div>
        </div>
        </form>
        </div>
    </div>
    );
}

const mapDispathToProps= (dispatch)=>{
    return{
        setCurrentUser: (user) =>dispatch(setCurrentUser(user)),
        setUserLoaded: (isLoaded)=>dispatch(setUserLoaded(isLoaded))
    }
}

export default connect(null, mapDispathToProps)(SignUp);