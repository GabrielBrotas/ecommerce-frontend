// reducer trata os states e actions

import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_ITEM_REQUEST, PRODUCT_ITEM_SUCCESS, PRODUCT_ITEM_FAIL, PAYMENT_LIST_REQUEST, PAYMENT_LIST_SUCCESS, PAYMENT_LIST_FAIL, IMAGE_SAVE_FAIL, IMAGE_SAVE_SUCCESS, IMAGE_SAVE_REQUEST } from "../constants/productConstants";

// definir o estado inicial do state
function productListReducer(state = {products: []}, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.results, next: action.next, previous: action.previous}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


function imageUploadReducer(state = {uploaded: false}, action) {

    switch (action.type) {
        case IMAGE_SAVE_REQUEST:
            return {uploaded: false, progress: action.payload}
        case IMAGE_SAVE_SUCCESS:
            return {uploaded: true, progress:100, image: action.payload}
        case IMAGE_SAVE_FAIL:
            return {uploaded: false, progress:100, errorUpload: true}
        default:
            return state
    }
}


function paymentListReducer(state = {payments: []}, action) {
    switch (action.type) {
        case PAYMENT_LIST_REQUEST:
            return {loading: true, payments: []}
        case PAYMENT_LIST_SUCCESS: 
            return {loading: false, payments: action.payload}
        case PAYMENT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productItemReducer(state = {product: {}}, action) {

    switch (action.type) {
        case PRODUCT_ITEM_REQUEST:
            return {loading: true, product: {}}
        case PRODUCT_ITEM_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_ITEM_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productDeleteReducer(state = {products: {}}, action) {

    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}

        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true, products: action.payload}

        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export {productListReducer, imageUploadReducer, productItemReducer ,productDeleteReducer, paymentListReducer}