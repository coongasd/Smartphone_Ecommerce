import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Toast (){
  return (
    <div>
      <ToastContainer
      position='top-right'
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl= {false}/>

    
    </div>
  );
}
export default Toast;