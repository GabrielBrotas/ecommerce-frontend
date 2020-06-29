import Axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_ITEM_REQUEST, PRODUCT_ITEM_SUCCESS, PRODUCT_ITEM_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PAYMENT_LIST_REQUEST, PAYMENT_LIST_SUCCESS, PAYMENT_LIST_FAIL} from '../constants/productConstants'


const listProducts = (filterCondition, page, limit) => async (dispatch) => {

    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        if(filterCondition === 'All' || filterCondition === null) {filterCondition= ''}
        
        const {data} = await Axios.get('http://localhost:8081/products/?page='+page+'&limit='+limit+'&filter='+filterCondition)

        const {results, next, previous} = data

        dispatch({type: PRODUCT_LIST_SUCCESS, results, next, previous})
    
    } catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }

}

const productById = (id) => async (dispatch) => {

    try{
        dispatch({type: PRODUCT_ITEM_REQUEST})
        
        const {data} = await Axios.get('http://localhost:8081/products/id/' + id)
        dispatch({type: PRODUCT_ITEM_SUCCESS, payload: data})
        
    } catch(error) {
        dispatch({type: PRODUCT_ITEM_FAIL})
    }
}


const saveProduct = (product) => async (dispatch) => {

    try {

        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product})

        if(!product._id){

            const {data} = await Axios.post('http://localhost:8081/products', product)
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})

        } else {
            const {data} = await Axios.put('http://localhost:8081/products/' + product._id, product)

            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }

        
    } catch(error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
}


const deleteProduct = (productId) => async (dispatch) => {

    try{
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
        const {data} = await Axios.delete('http://localhost:8081/products/' + productId)
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    } catch(error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message})
    }
}

const listPayments = (userId) => async (dispatch) => {
    try{
        dispatch({type: PAYMENT_LIST_REQUEST})

        if(userId){
            const {data} = await Axios.get('http://localhost:8081/payments/' + userId)
            dispatch({type: PAYMENT_LIST_SUCCESS, payload: data})
        } else {
            const {data} = await Axios.get('http://localhost:8081/payments/')
            dispatch({type: PAYMENT_LIST_SUCCESS, payload: data})
        }
        
    } catch(error) {
        dispatch({type: PAYMENT_LIST_FAIL, payload: error.message})
    }
}

const changeDelivered = (id) => async (dispatch) => {

    await Axios.put('http://localhost:8081/payments/' + id)
    listPayments()
    dispatch(listPayments())

    
}

export {listProducts, productById, saveProduct, deleteProduct, listPayments, changeDelivered}