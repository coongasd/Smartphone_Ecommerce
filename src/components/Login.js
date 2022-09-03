import React , {useEffect,useState} from 'react';
import styled from 'styled-components';
import './Login.scss';
import {useDispatch,useSelector} from 'react-redux';
import $ from 'jquery';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {login} from './../Redux/Actions/userActions';
import Loading from './Loading';
import { register } from './../Redux/Actions/userActions';
import { Link } from 'react-router-dom';
function Login({location,history}) {
    
    window.scrollTo(0,0);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");


    const dispatch = useDispatch(); 
   
    const userLogin = useSelector((state) => state.userLogin);



    const {error,loading,userInfo} = userLogin;
 
    const redirect = location?.search ? location.search?.split("=")[1] : "/";
    
    
    const registerSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name,email,password));
      
        
    }
    
    useEffect(() =>{
    if(userInfo){
        history.push(redirect);
    } 
  
    },[userInfo,history,redirect]);

    const submitHandler = (e) =>
    {
        e.preventDefault();
        dispatch(login(email,password));
        
    }

    var LoginModalController = {
        tabsElementName: ".logmod__tabs li",
        tabElementName: ".logmod__tab",
        inputElementsName: ".logmod__form .input",
        hidePasswordName: ".hide-password",
        
        inputElements: null,
        tabsElement: null,
        tabElement: null,
        hidePassword: null,
        
        activeTab: null,
        tabSelection: 0, // 0 - first, 1 - second
        
        findElements: function () {
            var base = this;
            
            base.tabsElement = $(base.tabsElementName);
            base.tabElement = $(base.tabElementName);
            base.inputElements = $(base.inputElementsName);
            base.hidePassword = $(base.hidePasswordName);
            
            return base;
        },
        
        setState: function (state) {
            var base = this,
                elem = null;
            
            if (!state) {
                state = 0;
            }
            
            if (base.tabsElement) {
                elem = $(base.tabsElement[state]);
                elem.addClass("current");
                $("." + elem.attr("data-tabtar")).addClass("show");
            }
      
            return base;
        },
        
        getActiveTab: function () {
            var base = this;
            
            base.tabsElement.each(function (i, el) {
               if ($(el).hasClass("current")) {
                   base.activeTab = $(el);
               }
            });
            
            return base;
        },
       
        addClickEvents: function () {
            var base = this;
            
            base.hidePassword.on("click", function (e) {
                var $this = $(this),
                    $pwInput = $this.prev("input");
                
                if ($pwInput.attr("type") == "password") {
                    $pwInput.attr("type", "text");
                    $this.text("Hide");
                } else {
                    $pwInput.attr("type", "password");
                    $this.text("Show");
                }
            });
     
            base.tabsElement.on("click", function (e) {
                var targetTab = $(this).attr("data-tabtar");
                
                e.preventDefault();
                base.activeTab.removeClass("current");
                base.activeTab = $(this);
                base.activeTab.addClass("current");
                
                base.tabElement.each(function (i, el) {
                    el = $(el);
                    el.removeClass("show");
                    if (el.hasClass(targetTab)) {
                        el.addClass("show");
                    }
                });
            });
            
            base.inputElements.find("label").on("click", function (e) {
               var $this = $(this),
                   $input = $this.next("input");
                
                $input.focus();
            });
            
            return base;
        },
        
        initialize: function () {
            var base = this;
            
            base.findElements().setState().getActiveTab().addClickEvents();
        }
    };
    
    $(document).ready(function() {
        LoginModalController.initialize();
    });
    
  return (
            <>
              
                 <div className="logmod">
                <div className="logmod__wrapper">
                    <span className="logmod__close">Đóng</span>
                    <div className="logmod__container">
                    <ul className="logmod__tabs">  
                        <li data-tabtar="lgm-2"><a href="#">Đăng nhập</a></li>
                        <li data-tabtar="lgm-1"><a href="#">Đăng ký</a></li>
                    </ul>
                    <div className="logmod__tab-wrapper">
                    <div className="logmod__tab lgm-1">
                        <div className="logmod__heading">
                        
                        <span className="logmod__heading-subtitle">Điền thông tin cá nhân của bạn <strong>để đăng ký</strong></span>
                      
                        </div>
                        <div className="logmod__form">
                        
                        <form onSubmit={registerSubmitHandler} accept-charset="utf-8" action="#" className="simform">
                            <div className="sminputs">
                            <div className="input full">
                                <label className="string optional" for="user-name" >Email*</label>
                                <input className="string optional" maxLength="255" id="user-email" placeholder="Email" type="email" size="50" value={email} onChange={(e) => setEmail(e.target.value)} />
                                
                                
                            </div>
                        
                            </div>
                            <div className="sminputs">
                            <div className="input string optional">
                                <label className="string optional" for="user-pw">Tên người dùng</label>
                                <input className="string optional" maxLength="255" id="user-pw" placeholder="Tên người dùng" type="text" size="50" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input string optional">
                                <label className="string optional" for="user-pw-repeat">Mật khẩu *</label>
                                <input className="string optional" maxLength="255" id="user-pw-repeat" placeholder="Mật khẩu" type="password" size="50" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            
                            </div>
                            <div className="simform__actions">        
                            <button className="sumbit" name="commit" type="sumbit">Đăng ký</button>

                            </div> 
                        </form>
                        </div> 
                        <div className="logmod__alter">
                        <div className="logmod__alter-container">
                            <a href="#" className="connect facebook">
                            <div className="connect__icon">
                                <i className="fa fa-facebook"></i>
                            </div>
                            <div className="connect__context">
                                <span>Tạo tài khoản với <strong>Facebook</strong></span>
                            </div>
                            </a>
                            
                            <a href="#" className="connect googleplus">
                            <div className="connect__icon">
                                <i className="fa fa-google-plus"></i>
                            </div>
                            <div className="connect__context">
                                <span>Tạo tài khoản với <strong>Google+</strong></span>
                            </div>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="logmod__tab lgm-2">
                        <div className="logmod__heading">
                        {error && <h3>{error}</h3>}
                        {loading && <Loading/>}
                        <span className="logmod__heading-subtitle">Email và Password <strong>để đăng nhập</strong></span>
                        </div> 
                        <div className="logmod__form">
                        <form onSubmit={submitHandler} accept-charset="utf-8" action="#" className="simform">
                            <div className="sminputs">
                            <div className="input full">
                                <label className="string optional" for="user-name">Email*</label>
                                <input className="string optional" maxLength="255" id="user-email" placeholder="Email" type="email" size="50" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            </div>
                            <div className="sminputs">
                            <div className="input full">
                                <label className="string optional" for="user-pw">Password *</label>
                                <input className="string optional" maxLength="255" id="user-pw" placeholder="Password" type="password" size="50" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <span className="hide-password">Show</span>
                            </div>
                            </div>
                            <div className="simform__actions">
                            <button className="sumbit" name="commit" type="sumbit"  value="Log In" >Đăng nhập</button>
                            <span className="simform__actions-sidetext"><a className="special" role="link" href="#">Quên mật khẩu?<br/> Nhấn vào đây</a></span>
                            </div> 
                        </form>
                        </div> 
                        <div className="logmod__alter">
                        <div className="logmod__alter-container">
                            <a href="#" className="connect facebook">
                            <div className="connect__icon">
                                <i className="fa fa-facebook"></i>
                            </div>
                            <div className="connect__context">
                                <span>Đăng nhập với <strong>Facebook</strong></span>
                            </div>
                            </a>
                            <a href="#" className="connect googleplus">
                            <div className="connect__icon">
                                <i className="fa fa-google-plus"></i>
                            </div>
                            <div className="connect__context">
                                <span>Đăng nhập với <strong>Google+</strong></span>
                            </div>
                            </a>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            </>
         
  );
}

export default withRouter(Login);
