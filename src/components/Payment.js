import React ,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { savePaymentMethod, saveShippingAddress } from '../Redux/Actions/cartActions';
function Payment({history}) {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart;
    const [paymentMethod,setPaymentMethod] = useState("Paypal");

    console.log(paymentMethod);
    if(!shippingAddress)
    {
        history.push("/shipping");
    }
    
    const dispatch = useDispatch();
    const shippingSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeorder")
   
    }
return (
    <Container>
        <form onSubmit={shippingSubmitHandler}>
            <div className="formContainer">
                <h3>Chọn phương thức thanh toán</h3>
                <div className="radioButton">
                  <div>
                     <input type="radio" name="payment" value={paymentMethod} onChange = {(e) => setPaymentMethod(e.target.value)}/>
                    <label>Paypal</label><br></br>
                  </div>
                   <div>
                     <input type="radio"name="payment" value={paymentMethod} onChange = {(e) => setPaymentMethod(e.target.value)}/>
                     <label>VN Pay</label><br/>
                   </div>
                   <div>
                     <input type="radio"name="payment" value={paymentMethod} onChange = {(e) => setPaymentMethod(e.target.value)}/>
                     <label>Zalo Pay</label><br/>
                   </div>
                   
                   
                    
                </div>
               
                <button class="button-3" role="button">Thanh toán</button>
            </div>
        </form>
     </Container>
    
  )
}

export default withRouter(Payment)
const Container = styled.div`

  .radioButton{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
    margin-top:180px;
    display: flex;
   form {
        border: 1px solid white;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    }
  justify-content: center;
    .formContainer{
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 350px;
        align-items: center;
        .button-3 {
            appearance: none;
            width: 100%;
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
            padding: 6px 16px;
            position: relative;
            text-align: center;
            text-decoration: none;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            vertical-align: middle;
            margin-top: 15px;
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
