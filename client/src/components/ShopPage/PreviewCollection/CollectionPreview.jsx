import React from 'react';
import CollectionItem from '../CollectionItem/CollectionItem'
import './CollectionPreview.scss'

const CollectionPreview = ({ title, items }) => {
   // const shuffledItems = [...items].sort(() => 0.5 - Math.random());
    return (
        <div className='collection-preview'>
            <h1 className="title">{ title.toUpperCase() }</h1>
            <div className='preview'>
                {
                    items//.slice(0,4)
                    //.filter((item,index)=>index<4)
                    .map((item)=>(
                        <CollectionItem key={item.id} item={item}></CollectionItem>
                    ))
                }
            </div>
        </div>
    );
};

export default CollectionPreview;