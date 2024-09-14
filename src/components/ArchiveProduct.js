import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function ArchiveProduct({product, isActive, fetchData}) {

  const notyf = new Notyf();

  const [productId, setProductId] = useState(product._id);
  
  const archiveToggle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.success === true){
        notyf.success('Successfully Archived')
        fetchData();
      } else {
        notyf.error("Something Went Wrong")
        fetchData();
      }
    })
  }
  const activateToggle = () => {
    
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(data.success === true){
        notyf.success("Successfully Activated")
        fetchData();
      } else {
        notyf.error("Something Went Wrong")
        fetchData();
      }
    })
  }


  return (
    <>
      {isActive ?

      <Button variant="danger" size="sm" onClick={() => archiveToggle()}>Disable</Button>

      :

      <Button variant="success" size="sm" onClick={() => activateToggle()}>Activate</Button>

      }
    </>
  )
}
