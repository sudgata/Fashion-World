import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.util';
import { addUser } from '../../api/user-api';
import './SignUp.scss';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions/userAction';

const SignUp = ({ setCurrentUser }) => {

    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password , confirmPassword} = signUpData;

    const handleSubmit =async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match!");
            return;
        }

        try{
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
                <button  type="submit" className="submit-button">Register</button>
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
        setCurrentUser: (user) =>dispatch(setCurrentUser(user))
    }
}

export default connect(null, mapDispathToProps)(SignUp);