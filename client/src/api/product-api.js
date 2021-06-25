import axios from 'axios';

const baseUrl = 'http://localhost:5000/product';

export const getProductCategories = async() =>{
    try{
        const { data: categories } = await axios.get(`${baseUrl}/categories`);
        categories.forEach(item =>{
            item.linkUrl= `shop/${item.title}`;
        });
        return categories;
    }
    catch(err){
        console.log(err);
    }
}


export const getProductsByCategory = async(collectionId) =>{
    if(!collectionId) return;
    try{
        const { data: products } = await axios.get(`${baseUrl}/category/${collectionId}`);
        return products;
    }
    catch(err){
        console.log(err);
    }
}

export const getShopData = async() =>{
    try{
        const { data: shopData } = await axios.get(`${baseUrl}/shop`);
        return shopData;
    }
    catch(err){
        console.log(err);
    }
}
