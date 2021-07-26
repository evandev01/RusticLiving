import {
  ACCENT_REQUEST,
  ACCENT_SUCCESS,
  ACCENT_FAIL,
  ACCENT_DETAILS_REQUEST,
  ACCENT_DETAILS_SUCCESS,
  ACCENT_DETAILS_FAIL,
  ACCENT_CREATE_REQUEST,
  ACCENT_CREATE_SUCCESS,
  ACCENT_CREATE_FAIL,
  ACCENT_CREATE_RESET,
  ACCENT_UPDATE_REQUEST,
  ACCENT_UPDATE_SUCCESS,
  ACCENT_UPDATE_FAIL,
  ACCENT_UPDATE_RESET,
  ACCENT_DELETE_REQUEST,
  ACCENT_DELETE_SUCCESS,
  ACCENT_DELETE_FAIL,
} from '../../constants/customProductConstants/accentConstants'

export const accentListReducer = (state = { accents: [] }, action) => {
  switch (action.type) {
    case ACCENT_REQUEST:
      return {
        loading: true,
        accents: [],
      }
    case ACCENT_SUCCESS:
      return {
        loading: false,
        accents: action.payload,
      }
    case ACCENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accentDetailsReducer = (state = { accent: {} }, action) => {
  switch (action.type) {
    case ACCENT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case ACCENT_DETAILS_SUCCESS:
      return {
        loading: false,
        accent: action.payload,
      }
    case ACCENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCENT_CREATE_REQUEST:
      return { loading: true }
    case ACCENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        accent: action.payload,
      }
    case ACCENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ACCENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const accentUpdateReducer = (state = { accent: {} }, action) => {
  switch (action.type) {
    case ACCENT_UPDATE_REQUEST:
      return { loading: true, accent: {} }
    case ACCENT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        accent: action.payload,
      }
    case ACCENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ACCENT_UPDATE_RESET:
      return { accent: {} }
    default:
      return state
  }
}

export const accentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCENT_DELETE_REQUEST:
      return { loading: true }
    case ACCENT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ACCENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
