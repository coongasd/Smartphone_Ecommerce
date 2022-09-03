import React ,{useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { saveShippingAddress } from '../Redux/Actions/cartActions';
function Shipping({history}) {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;
    const [address,setAddress] = useState(shippingAddress.address);
    const [phoneNumber,setPhoneNumber] = useState(shippingAddress.phoneNumber);
    const [city,setCity] = useState(shippingAddress.city);
    const dispatch = useDispatch();
    const shippingSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress({address,phoneNumber,city}));
      history.push("/payment");
      console.log("1")
    }
  return (
    <Container>
      
            <DeliveryAddressForm>
                  
                    <form onSubmit={shippingSubmitHandler} accept-charset="utf-8" action="#" className="simform">
                        <h2>Địa chỉ giao hàng</h2>
                         <div id="shippingForm">
                            
                           <input type="text" placeholder="Thành phố" name="city" value={city} onChange={(e) => setCity(e.target.value)} required/>
                            <input type="text" placeholder="Địa chỉ" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            
                            <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} name="phonenumber" required/>

                           
                            <button class="button-3" role="button">Tiếp tục</button>
                         </div>
                       
                    </form>
                
                    
            </DeliveryAddressForm>
                    
    </Container>
  )
}

export default withRouter(Shipping)

const Container = styled.div`
    margin-top: 80px;
    display:flex;
    justify-content:center;
`


const DeliveryAddressForm = styled.div`

    form{
        border: 1px solid white;
        margin-top: 150px;
        padding-bottom: 60px;
        width: 500px;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    }
    #shippingForm{
        display: flex;
        flex-direction: column;
        input{
            width: 350px;
            height: 50px;
            margin-top: 15px;
            box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
            border-radius: 5px;
            border-color: white;
        }
        
        align-items: center;
    }
    .button-3 {
        appearance: none;
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        width:70%;
        height: 50px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        margin-top: 25px;
       
        white-space: nowrap;
      }
      
      .button-3:focus:not(:focus-visible):not(.focus-visible) {
        box-shadow: none;
        outline: none;
      }
      
      .button-3:hover {
        background-color: #2c974b;
      }
      
      .button-3:focus {
        box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
        outline: none;
      }
      
      .button-3:disabled {
        background-color: #94d3a2;
        border-color: rgba(27, 31, 35, .1);
        color: rgba(255, 255, 255, .8);
        cursor: default;
      }
      
      .button-3:active {
        background-color: #298e46;
        box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
      }
      
     }
      
`
