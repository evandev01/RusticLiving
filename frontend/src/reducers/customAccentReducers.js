import {
  CUSTOM_ACCENT_REQUEST,
  CUSTOM_ACCENT_SUCCESS,
  CUSTOM_ACCENT_FAIL,
  CUSTOM_ACCENT_DETAILS_REQUEST,
  CUSTOM_ACCENT_DETAILS_SUCCESS,
  CUSTOM_ACCENT_DETAILS_FAIL,
  CUSTOM_ACCENT_CREATE_REQUEST,
  CUSTOM_ACCENT_CREATE_SUCCESS,
  CUSTOM_ACCENT_CREATE_FAIL,
  CUSTOM_ACCENT_CREATE_RESET,
  CUSTOM_ACCENT_UPDATE_REQUEST,
  CUSTOM_ACCENT_UPDATE_SUCCESS,
  CUSTOM_ACCENT_UPDATE_FAIL,
  CUSTOM_ACCENT_UPDATE_RESET,
  CUSTOM_ACCENT_DELETE_REQUEST,
  CUSTOM_ACCENT_DELETE_SUCCESS,
  CUSTOM_ACCENT_DELETE_FAIL,
} from '../constants/customAccentConstants'

export const customAccentListReducer = (
  state = { customAccents: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_ACCENT_REQUEST:
      return {
        loading: true,
        accents: [],
      }
    case CUSTOM_ACCENT_SUCCESS:
      return {
        loading: false,
        customAccents: action.payload,
      }
    case CUSTOM_ACCENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customAccentDetailsReducer = (
  state = { customAccent: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_ACCENT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_ACCENT_DETAILS_SUCCESS:
      return {
        loading: false,
        customAccent: action.payload,
      }
    case CUSTOM_ACCENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customAccentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_ACCENT_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_ACCENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customAccent: action.payload,
      }
    case CUSTOM_ACCENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_ACCENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const customAccentUpdateReducer = (
  state = { customAccent: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_ACCENT_UPDATE_REQUEST:
      return { loading: true, customAccent: {} }
    case CUSTOM_ACCENT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customAccent: action.payload,
      }
    case CUSTOM_ACCENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_ACCENT_UPDATE_RESET:
      return { customAccent: {} }
    default:
      return state
  }
}

export const customAccentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_ACCENT_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_ACCENT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CUSTOM_ACCENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
