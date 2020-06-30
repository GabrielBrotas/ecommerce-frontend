import {IMAGE_SAVE_FAIL, IMAGE_SAVE_SUCCESS, IMAGE_SAVE_REQUEST, IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_LIST_FAIL } from "../constants/imagesConstants";


function imageListReducer(state = {images: []}, action) {
    switch (action.type) {
        case IMAGE_LIST_REQUEST:
            return {loadingImages: true, images: []}
        case IMAGE_LIST_SUCCESS:
            return {loadingImages: false, images: action.payload}
        case IMAGE_LIST_FAIL:
            return {loadingImages: false, error: action.payload}
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

export {imageUploadReducer, imageListReducer}