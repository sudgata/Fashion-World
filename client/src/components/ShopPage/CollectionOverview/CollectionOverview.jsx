import React, { useEffect, useState } from 'react';
import { getShopData } from '../../../api/product-api';
import Spinner from '../../Common/Spinner/Spinner';
import CollectionPreview from '../PreviewCollection/CollectionPreview';
import './CollectionOverview.scss';

const CollectionOverview = () => {
    const [ collections, setCollections ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const fetchShopData = async () =>{
            setLoading(true);
            const shopData = await getShopData();
            setCollections(shopData);
            setLoading(false);
        }
        fetchShopData();
    },[]);

    if(loading){
        return <Spinner/>
    }
    else{
        return (
            <div className='collection-overview-container'>
                <h1  className='collection-overview-header'>Collections</h1>   
                {
                    collections.map((collection)=>(
                        <CollectionPreview key={collection.id} title={collection.title} items={collection.items}></CollectionPreview>
                    ))
                }
            </div>
        );
    }
}

export default CollectionOverview;