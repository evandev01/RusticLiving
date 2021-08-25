import axios from 'axios'
import {
  GALLERY_PHOTO_LIST_REQUEST,
  GALLERY_PHOTO_LIST_SUCCESS,
  GALLERY_PHOTO_LIST_FAIL,
  GALLERY_PHOTO_DETAILS_REQUEST,
  GALLERY_PHOTO_DETAILS_SUCCESS,
  GALLERY_PHOTO_DETAILS_FAIL,
  GALLERY_PHOTO_DELETE_REQUEST,
  GALLERY_PHOTO_DELETE_SUCCESS,
  GALLERY_PHOTO_DELETE_FAIL,
  GALLERY_PHOTO_CREATE_REQUEST,
  GALLERY_PHOTO_CREATE_SUCCESS,
  GALLERY_PHOTO_CREATE_FAIL,
  GALLERY_PHOTO_UPDATE_REQUEST,
  GALLERY_PHOTO_UPDATE_SUCCESS,
  GALLERY_PHOTO_UPDATE_FAIL,
} from '../constants/galleryConstants'

export const listGalleryPhotos = () => async dispatch => {
  try {
    dispatch({
      type: GALLERY_PHOTO_LIST_REQUEST,
    })

    const { data } = await axios.get('/api/gallery')

    dispatch({
      type: GALLERY_PHOTO_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GALLERY_PHOTO_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listGalleryPhotoDetails = id => async dispatch => {
  try {
    dispatch({
      type: GALLERY_PHOTO_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/gallery/${id}`)

    dispatch({
      type: GALLERY_PHOTO_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GALLERY_PHOTO_DETAILS_FAIL,
    })
  }
}

export const createGalleryPhoto = photo => async (dispatch, getState) => {
  try {
    dispatch({
      type: GALLERY_PHOTO_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/gallery`, photo, config)

    dispatch({
      type: GALLERY_PHOTO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GALLERY_PHOTO_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateGalleryPhoto = photo => async (dispatch, getState) => {
  try {
    dispatch({
      type: GALLERY_PHOTO_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/gallery/${photo._id}`, photo, config)

    dispatch({
      type: GALLERY_PHOTO_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GALLERY_PHOTO_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteGalleryPhoto = id => async (dispatch, getState) => {
  try {
    dispatch({ type: GALLERY_PHOTO_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/gallery/${id}`, config)

    dispatch({ type: GALLERY_PHOTO_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: GALLERY_PHOTO_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
