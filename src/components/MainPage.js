import React, {useState,useEffect } from 'react'
import styled from 'styled-components'
import Data from './data.json'
import { useDispatch,useSelector } from 'react-redux'
import ImgSlider from './ImgSlider'
import axios from "axios"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Loading from './Loading'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import { listProduct  } from '../Redux/Actions/ProductActions'
import { listItemSecondaryActionClasses } from '@mui/material'

function Mainproduct() {
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList;
    const keyword = useParams();    
    useEffect(() => {   
       dispatch(listProduct(keyword?.keyword));
    },[dispatch,keyword]);

    
    console.log(keyword);   
    return (
        <Container>   
            <ImgSlider/>         
            <h2> ĐIỆN THOẠI NỔI BẬT NHẤT</h2>  
            <Content>
                {
                    loading ? (<Loading/>) : error ? (<p>Error: {error}</p>)
                    :
                    (
                        <>
                             {
                                 products.map((product) =>(
                                <ContentBox key={product._id}>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/detail/${product._id}`}>
                                        <img src={product['img']} />
                                        <h3>{product.name}</h3>
                                    </Link>
                                <h3 id="price"> Giá: {product.price.toLocaleString() + (" đ")} </h3> 
                                {
                                    product.countInStock > 0 ? (
                                         <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/cart/${product._id}`}>
                                             <AddShoppingCartIcon id="shoppingCartIcon"/>
                                         </Link>
                                    ):
                                    (
                                        <span>Hết hàng</span>
                                    )
                                }
                                </ContentBox>
                                                  )
                                                )
                            }
                        </>
                    )
                }
            </Content>
        </Container>
            
    
    )
}

export default Mainproduct

const Container = styled.div`

  

    
    background-color: #F8F8FF;
    width: 100%;
    margin-top: 80px;
    h2{
       
       color: black;
        
    &:hover {
            color: #F58340;
          }
        cursor: pointer;
    }
    img{
        width:100%;
        
    }
    `
const ContentBox = styled.div`
    padding:10px;
    box-shadow: 5px 10px 18px #888888;
    width: 247px;
    height: 401px;
    margin-top: 15px;
    
    color: black;
    background-color: #E9E9F0;
    #shoppingCartIcon{
        cursor: pointer;
        &:hover{
            color: red;
        }
       
    }
    border-radius:0 0 25px 25px;
    img {
        width: 90%;
        cursor: pointer;
       
    }
    text-align: left;
   #price{
        color:#DC1F34;
   
}
    display:flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    &:hover{
        border: 4px solid white;
    }
`
const Content = styled.div`
    display: grid;
    
    margin-left: 50px;
    grid-template-columns:repeat(5,1fr);
    grid-gap: 5px;
 
`

