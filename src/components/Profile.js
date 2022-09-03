import React , {useEffect,useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails,updateUserProfile } from '../Redux/Actions/userActions';
import moment from "moment";
import Toast from './Toast';
import Loading from './Loading';
import {toast} from 'react-toastify';
function Profile()

{
 
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {error,loading,userInfo} = userLogin;
  
   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
   const {loading: updateLoading} = userUpdateProfile;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  

  const ToastId = React.useRef(null);
  const ToastObject = {
    pauseOnFocusLoss : false,
    draggable :false,
    pauseOnHover:false,
    autoClose: 2000,


  }
  useEffect(() => {
    dispatch(getUserDetails("profile"))
    if(userLogin){
      setName(userInfo?.name);
      setEmail(userInfo?.email);
      
    }
  },[dispatch,userLogin])
  
  const submitHandler = (e) => {
  
    e.preventDefault();
    if(password!==confirmPassword){
      if(!toast.isActive(ToastId.current)){
        ToastId.current = toast.error("2 mật khẩu không trùng nhau",ToastObject);
      }
    

    }
    else{
      dispatch(updateUserProfile({id:userInfo._id, name, email, password}))
      if(!toast.isActive(ToastId.current)){
        ToastId.current = toast.success("Chỉnh sửa thành công",ToastObject);
      }
    }
  };

  return <Container>
      <Toast/>
      {error && <p>{error}</p>}
      {loading && <Loading/>}
      {updateLoading && <Loading/>}
      <div id="main-card">
        <div className="cover-photo"></div>
        <div className="photo">
            <img src="https://www.pinclipart.com/picdir/middle/133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png" alt=""/>
        </div>
        <div className="content">
            <h2 className="name">{userInfo?.name}</h2>
            <h3 className="email">
                <a href={userInfo?.email}>{userInfo?.email}</a>
            </h3>
            <h4 className="joined">
                <>Tham gia vào: {moment(userInfo?.createdAt).format('l')}</>
            </h4>
        </div>
        <div className="contact">
            <ul>
                <a href="https://www.linkedin.com/in/abdeladhim-abbassi/" target="_blank">
                    <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://github.com/Adhouma" target="_blank">
                    <i className="fa fa-github"></i>
                </a>
                <a href="https://codepen.io/Adhouma/" target="_blank">
                    <i className="fa fa-codepen"></i>
                </a>
            </ul>
        </div>
    </div>

    <div className="profile-with-button">
      <form  onSubmit={submitHandler} >
       <div className="profile">
        <div id="profile-firstrow">
          <label className="string optional" for="user-name" >Tên người dùng</label>
          <input className="string optional" maxLength="255" id="user-name" value={name} onChange={(e) => setName(e.target.value)}placeholder="Tên người dùng" type="text" size="50"/>
          <label className="string optional" for="user-name" >Email*</label>
          <input className="string optional" maxLength="255"value={email} onChange={(e) => setEmail(e.target.value)}  id="user-email" placeholder="Email" type="email" size="50"/>
        </div>
        <div id="profile-secondrow">
          <label className="string optional" for="user-name" >Mật khẩu mới</label>
          <input className="string optional" maxLength="255" value={password}  onChange={(e) => setPassword(e.target.value)} id="user-password" placeholder="Mật khẩu mới" type="password" size="50"/>
          <label className="string optional" for="user-name" >Xác nhận mật khẩu mới</label>
          <input className="string optional" maxLength="255" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} id="user-newPassword" placeholder="Xác nhận mật khẩu mới" type="password" size=" 50"/>
        </div>
      </div>
       <button class="button-3" role="button">Thay đổi thông tin</button>
  
      </form>
     
    </div>
    
  </Container>;
}

export default Profile;
const Container = styled.div`

.profile-with-button{
  display: flex;
  flex-direction: column;
  #buttom{
    margin-top: 15px;
  }
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
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin-top: 155px;
  margin-left: 30px;
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
  .profile{
    margin-left: 50px;
    display: flex;
    margin-top: 160px;
    #profile-firstrow, #profile-secondrow{
      margin-left: 15px;
      display: flex;
      
      flex-direction: column;
      width: 250px;
      height: 120px;  
        input{
          height: 100px;
          background-color:#DDFBEC;
          border-radius: 5px;
        }
      label{
        text-align: left;
      }
    
    }
    #profile-secondrow{
      
    }
  }

  margin-top: 80px;
  display: flex;
  margin-left: 355px;
  justify-content: flex-start;
  body {
    font-size: 12px;
    font-family: Comic Sans MS;
    padding: 50px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  #main-card {
    max-width: 300px;
    box-shadow: -5px 2px 18px 4px #ccc;
    margin-top: 120px;
  }

  .cover-photo {
    background: #0ab581;
    width: 300px;
    height: 100px;
  }

  .photo {
    background: #f9f9f9;
    width: 300px;
    height: 100px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  img {
    position: relative;
    top: -50px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    box-shadow: -1px 1px 11px 6px rgba(189, 172, 172, 0.33);
  }
  .content {
    background: #f9f9f9;
    width: 300px;
    height: 100px;
    position: relative;
    top: -35px;
  }

  .contact {
    background: #30354d;
    width: 300px;
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  h2.name,
  h3,
  a {
    margin: 0;
    text-align: center;
  }

  h2.name {
    padding-bottom: 20px;
  }

  h3.fullstack {
    padding-bottom: 10px;
  }

  a {
    color: #0ab581;
    text-decoration: none;
  }

  a:hover {
    color: black;
  }

  ul {
    padding: 0;
  }

  .fa {
    font-size: 22px;
    padding: 10px;
    text-decoration: none;
    color: #0ab581;
  }

  .fa:hover {
    color: white;
  }

  a.certified {
  color: black;
  cursor: pointer;
  }

  a.certified:hover {
  color: #0ab581;
  }

  div#main-card:hover {
    -webkit-animation-name: pulse;  
    animation-name: pulse;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
    @-webkit-keyframes pulse {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
  }
    @keyframes pulse {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
  } 

`