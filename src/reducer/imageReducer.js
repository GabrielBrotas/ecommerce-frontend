import {IMAGE_SAVE_FAIL, IMAGE_SAVE_SUCCESS, IMAGE_SAVE_REQUEST } from "../constants/imagesConstants";

function imageListReducer( state ={}, action) {
    
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

export {imageUploadReducer}