import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST } from "../Constants/ProductConstants"
import axios from "axios";


//danh sach tat ca sp
export const listProduct = (keyword = " ") => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        
        const{data} = await axios.get(`https://job-search-server.onrender.com/api/products?keyword=${keyword}`);
        dispatch({ type:PRODUCT_LIST_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message
            : error.message
        });
    }
}

// 1 sp
export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`https://job-search-server.onrender.com/api/products/${id}`);
        dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message
            : error.message
        });
    }
}