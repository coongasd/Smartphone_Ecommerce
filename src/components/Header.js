import React, { useEffect , useState } from 'react'
import { logout } from '../Redux/Actions/userActions';
import styled from "styled-components"
import MaterialIcon, { colorPalette } from 'material-icons-react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { devices } from '../utils/responsive';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
} from "react-router-dom";



function Header() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    let history = useHistory();
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart;
    const logOutHandler = () => {
        dispatch(logout());
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim())
        {
         history.push(`/search/${keyword}`)   
        }
        else
        {
            history.push('/');
        }
    }

    return (
        <HeadBar>
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/"> <img id="logo" src="/images/dropdown.png" /></Link>
            <div className="searchBox">
                
                   <input onChange={(e) => setKeyword(e.target.value)} className="searchInput" type="text" name="" placeholder="Tìm kiếm" />
                   <button type="submit" onClick={onSubmitHandler} className="searchButton" href="#">
                   <MaterialIcon icon="search" />
                </button>
          
                
            </div>
            <div className="Username">
                <div id="user">
                    {userInfo ? (
                        <>
                            <h3>{userInfo.name}</h3>
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile">
                                <img id="userIcon" src="https://www.pinclipart.com/picdir/middle/133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png" />
                            </Link>
                            <div className="dropdown-content">
                                <ul>
                                    <li>Hồ sơ</li>
                                    <li onClick={logOutHandler}>Đăng xuất</li>
                                </ul>
                            </div>
                        </>

                    ) : (
                        <>
                            <h3>Khách hàng</h3>
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/login"> <img id="userIcon" src="https://www.pinclipart.com/picdir/middle/133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png" /></Link>
                        </>

                    )}
                </div>
                <Badge badgeContent={cartItems.length} color="primary">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/cart"> <ShoppingCartIcon /></Link>
                </Badge>
            </div>

        </HeadBar>
    )
}
const HeadBar = styled.div`

    @media (max-width: 520px) {
        display: flex;
      
      #logo{
          margin-left: 0px;
      }
        .searchBox{
            display: none;
        }
  }    

    background-color:grey;
    width: 100%;
    height: 80px;
    display: flex; 

    position: fixed;
    top:0;
    z-index: 11111;
    border-bottom: 0.1px solid black;
    #logo {
        margin-top: 15px;
        margin-left: 15px;
        height: 48px;
        width: 55px; 
      
        border-radius: 5px;
        cursor: pointer;
    }
    h3{
        color: #F8F8FF;
        margin: auto;
    }
    #userIcon{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin: auto;
        cursor: pointer;
        
    } 
    
    #user{
        display: flex;
        margin-right: 50px;
        ul li{
            text-decoration: none;
            list-style: none;
            position: absolute;
            float: left;
            bottom: -25px;
            right: 40px;
            color: #FFFFFF;
            padding:5px;
            display: none;
        }
        &:hover ul li{
            background-color: #0D1117;
            border-radius: 15px;
            min-width: 170px;
            display: block;
            cursor: pointer;
           
       }
        
        position: relative;
        
    }
    .dropdown-content{
        position: absolute;
        bottom: 0;
        right: -40px;
    }
    

    .searchBox {
        position: absolute;
        left: 50%;
      
        transform:  translate(-50%,50%);
        background: #2f3640;
        background: white;
        border-radius: 40px;
      
        
    }
   
    .searchBox:hover > .searchInput {
        width: 240px;
        padding: 0 6px;
        color:black;
    }
    
    .searchBox:hover > .searchButton {
      background: white;
      color : #2f3640;
    }
    
    .searchButton {
      
        color: black;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.4s;
    }
    
    .searchInput {
        border:none;
        background: none;
        outline:none;
        float:left;
        padding: 0;
        color: white;
        font-size: 16px;
        transition: 0.4s;
        line-height: 40px;
        width: 0px;
    
    }
    
    @media screen and (max-width: 620px) {
    .searchBox:hover > .searchInput {
        width: 150px;
        padding: 0 6px;
    }
    }
    .Username{
        position: absolute;
        right: 10px;
        top: 17%;
        align-items: center;
        display: flex;
        
    }
    .MuiBadge-root{
        margin-left:-50px;
        cursor: pointer;
    }
`
export default Header
