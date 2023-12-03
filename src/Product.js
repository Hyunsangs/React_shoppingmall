import React, { useState } from 'react';
import data from './data.js';
import { useNavigate } from 'react-router-dom';
function Product (props) {

    const navigate = useNavigate()

    return (
        
        <div className='col-md-4'>
            <img onClick={() => {navigate('./detail/' + (props.i))}} src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width='80%' />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            <p>{props.shoes.price}</p>
        </div>
        
        
    )
}

export default Product;