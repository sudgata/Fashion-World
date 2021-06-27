import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../api/product-api';
import Spinner from '../../components/Common/Spinner/Spinner';
import CollectionItem from '../../components/ShopPage/CollectionItem/CollectionItem';
import './CollectionPage.scss'

const CollectionPage = ( {location} ) => {

    const [ title, setTitle ] = useState("");
    const [ products, setProducts ] = useState([]);
    const categoryId = new URLSearchParams(location.search).get("cid");

    useEffect(()=>{
        const fetchProductsByCategory = async () =>{
            const products = await getProductsByCategory(categoryId);
            setTitle(products.title);
            setProducts(products.items);
        }
        fetchProductsByCategory();
    },[categoryId]);


    if(products.length === 0){
        return <Spinner/>;
    }
    else{
    return (
        <div className='collection-container'>
            <h2 className='collection-header'>{ title?.toUpperCase() }</h2>
            <div className='collection-items'>
                {
                    products.map(product=>(
                        <CollectionItem key={product.id} item={product}/>
                    ))
                }
            </div>
        </div>
    );
    }
};

export default CollectionPage;