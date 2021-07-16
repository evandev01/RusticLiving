import {
  CUSTOM_STAIN_REQUEST,
  CUSTOM_STAIN_SUCCESS,
  CUSTOM_STAIN_FAIL,
  CUSTOM_STAIN_UPDATE_REQUEST,
  CUSTOM_STAIN_UPDATE_SUCCESS,
  CUSTOM_STAIN_UPDATE_FAIL,
  CUSTOM_STAIN_UPDATE_RESET,
  CUSTOM_STAIN_DETAILS_REQUEST,
  CUSTOM_STAIN_DETAILS_SUCCESS,
  CUSTOM_STAIN_DETAILS_FAIL,
  CUSTOM_STAIN_CREATE_REQUEST,
  CUSTOM_STAIN_CREATE_SUCCESS,
  CUSTOM_STAIN_CREATE_FAIL,
  CUSTOM_STAIN_CREATE_RESET,
  CUSTOM_STAIN_DELETE_REQUEST,
  CUSTOM_STAIN_DELETE_SUCCESS,
  CUSTOM_STAIN_DELETE_FAIL,
} from '../constants/customStainConstants'

export const customStainListReducer = (
  state = { customStains: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_STAIN_REQUEST:
      return {
        loading: true,
        customStains: [],
      }
    case CUSTOM_STAIN_SUCCESS:
      return {
        loading: false,
        customStains: action.payload,
      }
    case CUSTOM_STAIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customStainDetailsReducer = (
  state = { customStain: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_STAIN_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_STAIN_DETAILS_SUCCESS:
      return {
        loading: false,
        customStain: action.payload,
      }
    case CUSTOM_STAIN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customStainCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_STAIN_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_STAIN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customStain: action.payload,
      }
    case CUSTOM_STAIN_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_STAIN_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const customStainUpdateReducer = (
  state = { customStain: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_STAIN_UPDATE_REQUEST:
      return { loading: true }
    case CUSTOM_STAIN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customStain: action.payload,
      }
    case CUSTOM_STAIN_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_STAIN_UPDATE_RESET:
      return { customStain: {} }
    default:
      return state
  }
}

export const customStainDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_STAIN_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_STAIN_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CUSTOM_STAIN_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
