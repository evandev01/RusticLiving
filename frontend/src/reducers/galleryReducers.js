import {
  GALLERY_PHOTO_LIST_FAIL,
  GALLERY_PHOTO_LIST_REQUEST,
  GALLERY_PHOTO_LIST_SUCCESS,
  GALLERY_PHOTO_CREATE_FAIL,
  GALLERY_PHOTO_CREATE_REQUEST,
  GALLERY_PHOTO_CREATE_RESET,
  GALLERY_PHOTO_CREATE_SUCCESS,
  GALLERY_PHOTO_DELETE_FAIL,
  GALLERY_PHOTO_DELETE_REQUEST,
  GALLERY_PHOTO_DELETE_SUCCESS,
  GALLERY_PHOTO_DETAILS_FAIL,
  GALLERY_PHOTO_DETAILS_REQUEST,
  GALLERY_PHOTO_DETAILS_SUCCESS,
  GALLERY_PHOTO_UPDATE_FAIL,
  GALLERY_PHOTO_UPDATE_REQUEST,
  GALLERY_PHOTO_UPDATE_RESET,
  GALLERY_PHOTO_UPDATE_SUCCESS,
} from '../constants/galleryConstants'

export const galleryPhotoListReducer = (state = { photos: [] }, action) => {
  switch (action.type) {
    case GALLERY_PHOTO_LIST_REQUEST:
      return {
        loading: true,
        photos: [],
      }
    case GALLERY_PHOTO_LIST_SUCCESS:
      return {
        loading: false,
        photos: action.payload,
      }
    case GALLERY_PHOTO_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const galleryPhotoDetailsReducer = (state = { photo: {} }, action) => {
  switch (action.type) {
    case GALLERY_PHOTO_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case GALLERY_PHOTO_DETAILS_SUCCESS:
      return {
        loading: false,
        photo: action.payload,
      }
    case GALLERY_PHOTO_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const galleryPhotoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_PHOTO_CREATE_REQUEST:
      return { loading: true }
    case GALLERY_PHOTO_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        accent: action.payload,
      }
    case GALLERY_PHOTO_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GALLERY_PHOTO_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const galleryPhotoUpdateReducer = (state = { photo: {} }, action) => {
  switch (action.type) {
    case GALLERY_PHOTO_UPDATE_REQUEST:
      return { loading: true, photo: {} }
    case GALLERY_PHOTO_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        photo: action.payload,
      }
    case GALLERY_PHOTO_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GALLERY_PHOTO_UPDATE_RESET:
      return { photo: {} }
    default:
      return state
  }
}

export const galleryPhotoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_PHOTO_DELETE_REQUEST:
      return { loading: true }
    case GALLERY_PHOTO_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case GALLERY_PHOTO_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
