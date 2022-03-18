import ClearIcon from '@mui/icons-material/Clear';
import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../Redux/Actions/cartActions';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../Redux/Actions/cartActions';
function Cart({match,history,location}) {
    window.scrollTo(0,0);
    const productId = match.params.id;
    const dispatch = useDispatch();
    
 
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart;
   
  
      
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const total = cartItems.reduce((a,i) => a+ i.qty * i.price,0)?.toLocaleString();
    useEffect(() => {   
      
        if(productId)
        {
          dispatch(addToCart((productId),qty));
        }    
     },[dispatch,productId,qty]);

  
  const checkOutHandler = (e) => {
    history.push("/login?redirect=shipping");

  }
  const comBackHandler = (e) => {
    history.push("/");
  }
  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));

  }
    

  return (
    
        <Container>
             <h2>Giỏ hàng</h2>
             <h4>Tổng số sản phẩm trong giỏ hàng: {cartItems.length}</h4>
             {
               cartItems.length === 0? (
                 <div className="alert-container">
                   <h3>Không có sản phẩm trong giỏ hàng</h3>
                  
                 <Link style={{ color: 'inherit', textDecoration: 'inherit'}} 
                  to ="/">
                    <div class='alert alert__primary spacer' role='alert'>
                      <button type="button" class="button-44" >Quay lại mua sắm
                      </button>
                   </div>
                </Link>
               
                  </div>
               ):
               (
                 
                <>
                {
                  cartItems.map((item) => (
                    
                    <div className="cart-Box">
                    <img src={item.img}/>
                    <span onClick={() => removeFromCartHandle(item.product)} id="clearIcon"><ClearIcon/></span>
                    <div className="product-info">
                      {item.name}
                      <p>{item.price?.toLocaleString()} đ</p>
                      <div className="changeQuantity">
                          <p>Chọn số lượng:</p>
                          <div id="button-container">
                          {  <select
                                
                                value={item.qty}
                                onChange={(e) =>{
                                   dispatch(addToCart(item.product, Number(e.target.value)));
                                  
                                }
                                  
                                } 
                                 >  
                           
                                {
                                  [...Array(item.countInStock).keys()].map((x) => (
                                    <>
                                        <option defaultValue disabled hidden>Số lượng</option>
                                        <option key={ x+1} value = {x+1}>
                                              {x+1}
                                            
                                        </option>
                                    </>
                                   
                                   )) }
                               </select>            
                                  }                  
                          </div>
                      </div>
                    </div>        
                  </div>
                  ))
                }
              
                   <div className="priceBox">
                      <div className="totalPrice">
                          <h3>Tổng tiền tạm tính:</h3>
                      
                          <h2 id="total-price">{total} vnđ</h2>
                        
                      </div>
                      <button className="button-44" onClick={checkOutHandler} role="button">Đặt hàng</button>
                      <button className="button-2" onClick ={comBackHandler} role="button">Chọn sản phẩm khác</button>
                  </div>
                </>
               )
             }
            
            
        </Container>);
}


export default withRouter(Cart);
const Container = styled.div`
    margin-top: 80px;
    h2{
        color: red;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    .cart-Box{
        position: relative;
        width: 570px;
        height: 212.5px;
        display: flex;
        img{
            width: 30%;
            padding: 5px;
        }
        border: 1px solid;
        border-radius:15px;
        border-color: #dadada;
        box-shadow:0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)
    }
    .product-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p{
            color: red;
        }
    }
    #button-container{
      select{
        width: 80px;
     
      }
    }
    #clearIcon{
      position: absolute;
      right:0px;  
      cursor:pointer;
    }
    form {
        width: 300px;
        margin: 0 auto;
        text-align: center;
        padding-top: 0px;
      }
      
      .value-button {
        display: inline-block;
        border: 1px solid #ddd;
        margin: 0px;
        width: 40px;
        height: 20px;
        text-align: center;
        vertical-align: middle;
        padding: 11px 0;
        background: #eee;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      .value-button:hover {
        cursor: pointer;
      }
      
      form #decrease {
        margin-right: -4px;
        border-radius: 8px 0 0 8px;
      }
      
      form #increase {
        margin-left: -4px;
        border-radius: 0 8px 8px 0;
      }
      
      form #input-wrap {
        margin: 0px;
        padding: 0px;
      }
      
      input#number {
        text-align: center;
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin: 0px;
        width: 40px;
        height: 40px;
      }
      
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
      option{
        width: 20px;
      }
 .priceBox{
   width:570px;
   border: 1px solid;
   border-radius:15px;
   padding: 5px;
   border-color: #dadada;
   box-shadow:0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
   height: 223px;
 }
      .totalPrice{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }
      #total-price{
        color: red;
      }

      button{
        background: #e62143;
        border-radius: 11px;
        box-sizing: border-box;
        color: #fff;
        margin-top: 5px;
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
        text-transform: uppercase;
        border: 0;
      }
      .button-2{
        background: white;
        color: red;
        border: 1px solid red;
       
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

.alert-container{
  background-color: #C1F1FF;
  padding: 50px;
  width: 580px;
  color: #43626B;
  font-size: 16px;
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
`

