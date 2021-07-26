import {
  STAIN_REQUEST,
  STAIN_SUCCESS,
  STAIN_FAIL,
  STAIN_UPDATE_REQUEST,
  STAIN_UPDATE_SUCCESS,
  STAIN_UPDATE_FAIL,
  STAIN_UPDATE_RESET,
  STAIN_DETAILS_REQUEST,
  STAIN_DETAILS_SUCCESS,
  STAIN_DETAILS_FAIL,
  STAIN_CREATE_REQUEST,
  STAIN_CREATE_SUCCESS,
  STAIN_CREATE_FAIL,
  STAIN_CREATE_RESET,
  STAIN_DELETE_REQUEST,
  STAIN_DELETE_SUCCESS,
  STAIN_DELETE_FAIL,
} from '../../constants/customProductConstants/stainConstants'

export const stainListReducer = (state = { stains: [] }, action) => {
  switch (action.type) {
    case STAIN_REQUEST:
      return {
        loading: true,
        stains: [],
      }
    case STAIN_SUCCESS:
      return {
        loading: false,
        stains: action.payload,
      }
    case STAIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const stainDetailsReducer = (state = { stain: {} }, action) => {
  switch (action.type) {
    case STAIN_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case STAIN_DETAILS_SUCCESS:
      return {
        loading: false,
        stain: action.payload,
      }
    case STAIN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const stainCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STAIN_CREATE_REQUEST:
      return { loading: true }
    case STAIN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stain: action.payload,
      }
    case STAIN_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STAIN_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const stainUpdateReducer = (state = { stain: {} }, action) => {
  switch (action.type) {
    case STAIN_UPDATE_REQUEST:
      return { loading: true }
    case STAIN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stain: action.payload,
      }
    case STAIN_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STAIN_UPDATE_RESET:
      return { stain: {} }
    default:
      return state
  }
}

export const stainDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAIN_DELETE_REQUEST:
      return { loading: true }
    case STAIN_DELETE_SUCCESS:
      return { loading: false, success: true }
    case STAIN_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
