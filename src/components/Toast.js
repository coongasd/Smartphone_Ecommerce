import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';

function Toast (){
  return (
    <div>
      <ToastContainer
      position='bottom-right'
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl= {false}/>

    
    </div>
  );
}
export default Toast;

