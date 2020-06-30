import Axios from 'axios'
import {IMAGE_SAVE_FAIL, IMAGE_SAVE_SUCCESS, IMAGE_SAVE_REQUEST} from '../constants/imagesConstants'

const uploadImage = (uploadedFile) => (dispatch) => {
    const imageForm = new FormData()

    imageForm.append('file', uploadedFile.file, uploadedFile.name)

    Axios.post('http://localhost:8081/uploads', imageForm, {

        onUploadProgress: e=> {
            const progress = parseInt(Math.round( (e.loaded * 100) / e.total ))
            dispatch({type: IMAGE_SAVE_REQUEST, payload: progress})
        }

    }).then( response => {
        const {data} = response
        dispatch({type: IMAGE_SAVE_SUCCESS, payload: data})
    }).catch( err => {
        dispatch({type: IMAGE_SAVE_FAIL, payload: err.message})
    })
}

const deleteImage = (id) => async (dispatch) => {
    await Axios.delete(`http://localhost:8081/uploads/${id}`)
}

export {uploadImage, deleteImage}
