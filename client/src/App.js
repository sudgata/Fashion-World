import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/Shop/Shop';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { auth } from './firebase/firebase.util';
import { addUser } from './api/user-api';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/actions/userAction';
import { selectCurrentUser } from './redux/selectors/userSelectors';
import Checkout from './pages/Checkout/Checkout';
import { setCartItems } from './redux/actions/cartAction';
import Order from './pages/Order/Order';

const App = ({ currentUser, setCurrentUser, setCartItems }) => {

  useEffect(() => {
    const unsubscribeFromAuth= auth.onAuthStateChanged(async (user)=>{
      if(user){
        const { uid, email, displayName} = user;
        if(uid && email && displayName){
          const userResponse = await addUser({ uid, email, displayName});
          setCurrentUser(userResponse);
          if(userResponse.cartItems.length > 0)
            setCartItems(userResponse.cartItems)
        }
        else
          setCurrentUser({ uid, email, displayName });
      }
      else{
        setCurrentUser(user);
        setCartItems([]);
      }
    });
    return ()=>{
      unsubscribeFromAuth();
    }
  },[setCurrentUser,setCartItems]);

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={Checkout}></Route>
        <Route exact path='/login' render={()=>
        currentUser ? 
        (<Redirect to='/'/>):
        (<Login/>)}></Route>
        <Route exact path='/signup' render={()=>
        currentUser ?
        (<Redirect to='/'/>):
        (<SignUp/>)}></Route>
        
        <Route exact path='/orders' component={Order}></Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});


const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser : (user) => dispatch(setCurrentUser(user)),
    setCartItems : (cartitems) => dispatch(setCartItems(cartitems))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
