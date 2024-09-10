import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import PreviewProducts from '../components/PreviewProducts';

export default function CatalogPage() {

    const {user} = useContext(UserContext);

    const [products, setProducts] = useState([]);

    // http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/users/details

    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ?
            'http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/all'
            :
            'http://ec2-3-145-9-198.us-east-2.compute.amazonaws.com/b1/products/active'

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })    
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    }

    useEffect(() => {
        fetchData();
    }, [user])
    


    return (
        <>
            <h1 className="text-center mt-5 mb-4 display-4 font-weight-bold text-primary">
                Our Products
            </h1>


            {user.isAdmin === true ? (
                <></>
            ) : (
                <PreviewProducts productData={products}/>
            )}

            
        </>

    )
}
