import React ,{useEffect} from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector,useDispatch } from 'react-redux';
import LocationOn from '@mui/icons-material/LocationOn';

import { createOrder } from '../Redux/Actions/OrderAction';
import { ORDER_CREATE_RESET } from '../Redux/Constants/OrderConstants';
function PlaceOrder({history}) {
    const userLogin = useSelector((state) => state.userLogin);
  
    const {userInfo} = userLogin;  
    const cart = useSelector((state) => state.cart)
    
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toLocaleString();;

    const orderCreate = useSelector((state) => state.orderCreate);
    
    const {order,success,error} = orderCreate;
    
  const dispatch = useDispatch();
    useEffect(() => {
      if(success){
        history.push(`/order/${order._id}`);
        dispatch({type: ORDER_CREATE_RESET})
      }
    },[history, dispatch, success, order])

    const placeOrderHandler = (e) => {
      e.preventDefault();
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress:{
           address: cart.shippingAddress.address,
           city:cart.shippingAddress.city,
           phoneNumber: cart.shippingAddress.phoneNumber,

          },
        
          city:cart.shippingAddress.city,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          phoneNumber : cart.shippingAddress.phoneNumber
        })
      )
     
    }
  return (
    <Container>
        <DeliveryInfo>
            <div className="customer">
                <div id="icon"><AccountCircleIcon/></div>
                <div id="info">
                    <h3>Khách hàng</h3>
                    <p>{userInfo.name}</p>
                    <p>{userInfo.email}</p>
                </div>
            </div>
            <div className="order">
                <div id="icon"><LocalShippingIcon/></div>
                <div id="info">
                    <h3>Thông tin đơn hàng</h3>
                    <p>Tỉnh, thành phố : {cart.shippingAddress.city} </p>
                    <p>Phương thức thanh toán: {cart.paymentMethod} </p>
                </div>
            </div>
            <div className="location">
                <div id="icon"><LocationOn/></div>
                <div id="info">
                    <h3>Giao tới</h3>
                    <p>Địa chỉ : {cart.shippingAddress.address} </p>
                  
                </div>
            </div>
        </DeliveryInfo>
        <SecondContent>
        {
               cart.cartItems.length === 0? (
                 <div className="alert-container">
                   <h3>Không có sản phẩm trong giỏ hàng</h3>
                  
                 <Link style={{ color: 'inherit', textDecoration: 'inherit'}} 
                  to ="/">
                    <div className='alert alert__primary spacer' role='alert'>
                      <button type="button" class="button-44" >Quay lại mua sắm
                      </button>
                   </div>
                </Link>
               
                  </div>
               ):(
               
                   <div className="totalProduct">
               
                       {cart.cartItems.map((item,index) => (
                         
                        <div className="product" key={item.product}>
                                {console.log(item)}
                           <div id="img">
                                <img src={item.img} alt={item.name}/>
                                <p>{item.name}</p>
                           </div>
                           
                            <div className="qtyAndSubtotal">
                                <div id="qty">
                                    <p>Số lượng</p>
                                    <p>{item.qty}</p>
                                </div>
                                <div id="subtotal">
                                    <p>Giá</p>
                                    <p>{(item.price*item.qty).toLocaleString()}</p>
                                </div>
                            </div>
                          
                        </div>
                    ))}
                        <div className="totalPrice">
                            <div id="buttonCheckout">
                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/order">
                              <button onClick={placeOrderHandler} class="button-3" role="button">Xác nhận</button>
                            </Link>
                            </div>
                            <div id="total">
                                <p>Tổng cộng</p>
                                <p>{cart.itemsPrice} vnđ</p>
                            </div>   
                        </div> 
                      {
                        error && (
                          <div className='my-3 col-12'>
                              <p>{error}</p>
                          </div>
                        )
                      }
                   
                    </div>
                    
               )
               }
              
        </SecondContent>
    </Container>
  )
}

export default withRouter(PlaceOrder)

const Container = styled.div`
    flex-direction: column;
    margin-top:80px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DeliveryInfo = styled.div`
    margin-top: 30px;
    border: 1px solid white;
    background-color: #DDFBEC;
    padding: 25px;
    #icon{
        
            background-color:#CAE4E0;
            border: 1px solid #CAE4E0;
            padding: 25px;
            border-radius: 50%;
        
    }
    
    display: flex;
    .customer, .order ,.location{
        margin-left: 20px;
        p{
            margin-top:-15px;
        }
        display: flex;
        align-items:center;
        #info{
            margin-left: 20px;
            display:flex;
            flex-direction: column;
            align-items:start;
        }
    }
  
   
`
const SecondContent = styled.div`
 
    
   
    align-items: center;
    .qtyAndSubtotal{
        display: flex;
      
    }
    .totalPrice{
      margin-top: 30px;
      display: flex;
      float: right;
    #buttonCheckout{
      margin-right: 150px;
      margin-top: 10px;
    }
     #total{
      
     }
        p{
        
          margin-left: 40px;
        }
      }
     
    }
    .product{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid white;
        box-shadow: 0 4px 2px -2px gray;
        margin-top: 20px;
    }
    #img{
        img{
            width: 20%;
        }
        display: flex;
        align-items:center;
    }
  
    .totalProduct{
        margin-top: 20px;
       
        padding: 10px;
    
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