import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../components/Common/Spinner/Spinner';

const RestrictedRoute = ({component: Component, userLoaded , currentUser, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            !userLoaded ? (<Spinner/>):
            currentUser ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default RestrictedRoute;