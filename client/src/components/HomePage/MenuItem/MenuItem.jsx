import React from 'react';
import { withRouter } from 'react-router-dom';
import './MenuItem.scss';

const MenuItem = ({product, history, match}) => (
    <div className={product.size === 'large' ? 'large menu-item-top' : 'small menu-item-bottom'} style={{
        backgroundImage: `url(${product.imageUrl})`
    }}>
    <div className='content' onClick={()=>{
        history.push({
            pathname: `${match.url}${product.linkUrl}`,
            search: `?cid=${product.id}`,
            state: {title: '' , products: []}
        });
        }}>
        <h1 className='title'>{product.title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
    </div>
    </div>
    );

export default withRouter(MenuItem);