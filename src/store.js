import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDeleteReducer, productItemReducer, paymentListReducer } from './reducer/productReducers'
import { cartReducer } from './reducer/cartReducer'

import Cookie from 'js-cookie'
import { userRegisterReducer, userSigninReducer } from './reducer/userReducer'


const addressInfo = Cookie.getJSON('addressInfo') || {}
const cartItems = Cookie.getJSON('cartItems') || []
const userInfo = Cookie.getJSON('userInfo') || null

const initialState = {cartList: {cartItems, addressInfo}, userSignin: {userInfo}}

const reducer = combineReducers({
    productList: productListReducer,
    productItem: productItemReducer,
    productDelete: productDeleteReducer,
    cartList: cartReducer,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    paymentList: paymentListReducer,
})


const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)))

export default store