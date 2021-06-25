import React, { useState, useEffect } from 'react';
import { getProductCategories } from '../../../api/product-api';
import Spinner from '../../Common/Spinner/Spinner';
import MenuItem from '../MenuItem/MenuItem';
import './MenuContainer.scss';

const MenuContainer = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(()=>{
      const fetchProductCategories = async() =>{
        try{
          const productCategories = await getProductCategories();
          if(productCategories)
            setProducts(productCategories)
        }
        catch(err){
          console.log(err);
        }
      }
      fetchProductCategories();
    },[]);
  
  //   [
  //     {
  //         "title": "mens",
  //         "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
  //         "size": "large",
  //         "id": 1,
  //         "linkUrl": "shop/mens"
  //       },
  //       {
  //         "title": "womens",
  //         "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
  //         "size": "large",
  //         "id": 2,
  //         "linkUrl": "shop/womens"
  //       },
  //       {
  //         "title": "hats",
  //         "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
  //         "id": 3,
  //         "linkUrl": "shop/hats"
  //       },
  //       {
  //         "title": "jackets",
  //         "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
  //         "id": 4,
  //         "linkUrl": "shop/jackets"
  //       },
  //       {
  //         "title": "sneakers",
  //         "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
  //         "id": 5,
  //         "linkUrl": "shop/sneakers"
  //       }
  // ]
    if(products.length === 0){
      return <Spinner/>
    }
    else{
      return (
        <div className='container'>
            {
                products.map((product)=>(
                    <MenuItem key={product.id} product={product} />
                ))
            }   
        </div>
    );
  }
}

export default MenuContainer;