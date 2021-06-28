import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Spinner from '../components/Common/Spinner/Spinner';

const PrivateRoute = ( {component: Component, userLoaded, currentUser , ...rest} ) => {
    return (
        <Route
        {...rest}
        render={
            (props)=>(  
                !userLoaded ? 
                (<Spinner/>):
                currentUser ?
                 (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname:'/login',
                        state: {from: props.location}
                    }} />
                )
            )
        }
        />
    );
};

export default PrivateRoute;