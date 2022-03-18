import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useDispatch,useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from './Loading';
import { listProductDetails } from '../Redux/Actions/ProductActions';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CameraIcon from '@mui/icons-material/Camera';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import {Link} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

function Detail({match}) {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    let settings = {
        dots : true,
        infinite : true,
        speed : 500,
        slideToShow :1,
        slideToScroll: 1,
        autoplay:false
    }
    
   

    const productId = match.params.id;
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
   

       
    useEffect(() => {   
       dispatch(listProductDetails(productId));
      
       
    },[dispatch,productId]);



       
        

    return (
        
        <Container>
            
                {
                    
                    loading ? (<Loading/>) : error ? (<p>Error: {error}</p>)
                    :
                    (
                        
                        <>
                            <h2>{product.name}</h2>
                            <div className="box-content-container">
                               
                                
                                <Carosel {...settings}>
                                    <Wrap>
                                        <div id="imgBox">
                                            <h3>Tính năng nổi bật</h3>
                                            <img src={product['img']}/>
                                            <ul>
                                                <li>{product.tinhNang?.tinhNang1}</li>
                                                <li>{product.tinhNang?.tinhNang2}</li>
                                                <li>{product.tinhNang?.tinhNang3}</li>
                                                <li>{product.tinhNang?.tinhNang4}</li>
                                            </ul> 
                                        </div>
                                    </Wrap>
                                    <Wrap>
                                        <div id="imgBox">  
                                            <img id="imgSlide" src={product.imgSlide?.img1}/>
                                        </div>
                                    </Wrap>
                                    <Wrap>
                                        <div id="imgBox">  
                                            <img id="imgSlide" src={product.imgSlide?.img2}/>
                                        </div>
                                    </Wrap>
                                    <Wrap>
                                        <div id="imgBox">  
                                            <img id="imgSlide" src={product.imgSlide?.img3}/>
                                        </div>
                                    </Wrap>
                                    <Wrap>
                                        <div id="imgBox">  
                                            <img id="imgSlide" src={product.imgSlide?.img4}/>
                                        </div>
                                    </Wrap>
                                </Carosel>
                                <div className="box-center-container">
                                    <div className="box-center">
                                        <ul>
                                            <div className="details"><PhoneAndroidIcon/><li>{product.detail?.manHinh}</li></div>
                                            <div className="details"><CameraIcon/><li>{product.detail?.cameraSau}</li></div>
                                            <div className="details"><CameraFrontIcon/><li>{product.detail?.cameraSelfie}</li></div>
                                            <div className="details"><MemoryIcon/><li>{product.detail?.CPU}</li></div>           
                                            <div className="details"><StorageIcon/><li>{product.detail?.BoNhoTrong}</li></div> 
                                            
                                        </ul>
                                        <div id="rating">
                                                    <ReactStars
                                                            value={product.rating}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                            a11y={false}
                                                        />
                                                   <p>{product.numReviews} Đánh giá</p> 
                                                </div>
                                    </div>                                     
                                                {product.countInStock > 0 ? (
                                                    <>
                                                                     
                                                        <div className="box-right">
                                                            <h4>Số lượng còn lại: {product.countInStock}</h4>  
                                                            <div id="price">
                                                                
                                                            <h3 id="product">{product.price?.toLocaleString() + (" đ")}</h3>
                                                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/cart/${product._id}`}> 
                                                                <button className="button-44" role="button">Mua ngay</button>
                                                            </Link>
                                                            
                                                            </div>
                                                        </div>
                                                    </>
                                                   
                                                   
                                                ) : (
                                                    <span>Hết hàng</span>
                                                )          
                                                }

                                               
                                                 
                                                
                                          
                                         
                                            
                                               
                                     
                                    
                                    
                                   
                                </div>
                               
                            </div>
                         
                            
                          
                        </>
                    )
                }

             
        </Container>
    )
}

export default withRouter(Detail);
const Container = styled.div`
    margin-top:80px;
    background-color: #FFFFFF;
    
    padding-left: 50px;
    height: 800px;
    width: 100%;
    #imgBox{
       
        height: 367px;
        background: linear-gradient(to right, #dd5e89, #f7bb97);
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;    
        position: relative;
        padding: 45px;
        flex-direction: column;
        li{
            font-size: 14px;
            color: white;
            line-height: 1.45;
        }
      
      
        
    }
    .css-i4bv87-MuiSvgIcon-root{
        font-size: 20px;
        opacity:0.5;
    }
    .box-center{
        width:550px;
        background-color: #F8F9FA;
        border:solid 1px #e9ecef;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items:center;
        height: 223px;
        justify-content: center;
        position: relative;
    }
   .box-center ul{
       list-style-type:none;
       display: flex;
       flex-direction: column;
       margin-left: -20px;
       position: absolute;
       top: 0;
   }
    img{
        float: left;
        box-shadow: 5px 10px 18px #888888;
        border-radius: 1rem;
        border: 1px solid #D1D5DB;
       
        width: 30%;
        background-color: white;
    }
    h2{
        margin-top: 55px;
        color: black;
        text-align: left;
        &:hover {
            color: #F58340;
          }
        cursor: pointer;
       border-bottom: 2px solid #D1D5DB;
    }
    h3{
        color: white;
    }
     #product{
        color: red;
    }
    #imgSlide{
        width: 100%;
    }

    #price{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding-left: 20px;
    }

    .box-content-container{
        display: flex;
    }

    .details{
        display: flex;
        
    }
    #rating{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
    }
    .button-44 {
        background: #e62143;
        border-radius: 11px;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: flex;
        font-family: Mija,-apple-system,BlinkMacSystemFont,Roboto,"Roboto Slab","Droid Serif","Segoe UI",system-ui,Arial,sans-serif;
        font-size: 1.15em;
        font-weight: 700;
        justify-content: center;
        line-height: 33.4929px;
        padding: .8em 1em;
        text-align: center;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        text-shadow: rgba(0, 0, 0, .3) 1px 1px 1px;
        text-underline-offset: 1px;
        transition: all .2s ease-in-out;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 100%;
        word-break: break-word;
        border: 0;
      }
      
      .button-44:active,
      .button-44:focus {
        border-bottom-style: none;
        border-color: #dadada;
        box-shadow: rgba(0, 0, 0, .3) 0 3px 3px inset;
        outline: 0;
      }
      
      .button-44:hover {
        border-bottom-style: none;
        border-color: #dadada;
      }
      .box-center-container{
          display: flex;
          flex-direction: column;
          height: 368px;
      }
     
`
const Carosel = styled(Slider)`
    ul li button{
        position: absolute;
        top: 105px;
        &:before{
            font-size: 20px;
            color: rgb(150, 158, 171);
        }
        
    }
    .slick-prev{
        left: 3px;
        bottom:5px;
      
    }
    .slick-next{
        right: 20px;
        
    }
    
    .slick-prev:before, .slick-next:before{
        color: black;
        font-size: 40px;
        position: absolute;
        left: 0px;
        opacity: 0.5;   
        
       
      
    }
    
    li.slick-active button:before{
        color: black;
    }


    width:460px;
    height:365px;
    button {
        z-index: 1;
    }
    `
    const Wrap = styled.div`
    
`