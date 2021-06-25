import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCESS, PRODUCT_DETAILS_FAIL } from '../constants/productConstants.js'
import axios from 'axios'
export const listProducts = () => async (dispatch) => {     //action reducer -> it means that when something happens and "action" is triggered (actions are PRODUCT_LIST_REQUEST, etc)
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })            //when we "list products" first we do a request (getting data)
        const { data } = await axios.get('/api/products')   //getting the data
        dispatch({                                          //after getting data we have the list of products sucesfully 
            type: PRODUCT_LIST_SUCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({                                          //if something goes wrong we have a fail
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {     //action reducer -> it means that when something happens and "action" is triggered (actions are PRODUCT_LIST_REQUEST, etc)
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })            //when we "list products" first we do a request (getting data)
        const { data } = await axios.get(`/api/products/${id}`)   //getting the data
        dispatch({                                          //after getting data we have the list of products sucesfully 
            type: PRODUCT_DETAILS_SUCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({                                          //if something goes wrong we have a fail
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}