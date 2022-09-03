import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from './Reducer/ProductReducers';
import { cartReducer } from './Reducer/CartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducer/userReducer';
import { orderCreateReducer, orderPayReducer } from './Reducer/OrderReducer';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails: orderCreateReducer,
    orderPay: orderPayReducer,
});
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: [];

    //login

    const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

    //shipping address
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress:shippingAddressFromLocalStorage,
    },
    userLogin:{ userInfo:userInfoFromLocalStorage },
    
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;