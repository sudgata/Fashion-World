import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CollectionOverview from '../../components/ShopPage/CollectionOverview/CollectionOverview';
import CollectionPage from '../CollectionPage/CollectionPage';
import './Shop.scss';

const Shop = ({ match }) => (
    <div className='shop-container'>
        <Switch>
            <Route exact path={`${match.path}`} component={CollectionOverview}></Route>
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}></Route>
            {/* <Route path="*">
                <Redirect to={`${match.path}`} />
            </Route> */}
        </Switch>
    </div>
);

export default Shop;