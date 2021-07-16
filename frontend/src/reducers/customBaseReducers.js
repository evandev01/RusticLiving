import { CUSTOM_ACCENT_CREATE_RESET } from '../constants/customAccentConstants'
import {
  CUSTOM_BASE_REQUEST,
  CUSTOM_BASE_SUCCESS,
  CUSTOM_BASE_FAIL,
  CUSTOM_BASE_DETAILS_REQUEST,
  CUSTOM_BASE_DETAILS_SUCCESS,
  CUSTOM_BASE_DETAILS_FAIL,
  CUSTOM_BASE_CREATE_REQUEST,
  CUSTOM_BASE_CREATE_SUCCESS,
  CUSTOM_BASE_CREATE_FAIL,
  CUSTOM_BASE_UPDATE_REQUEST,
  CUSTOM_BASE_UPDATE_SUCCESS,
  CUSTOM_BASE_UPDATE_FAIL,
  CUSTOM_BASE_UPDATE_RESET,
  CUSTOM_BASE_DELETE_REQUEST,
  CUSTOM_BASE_DELETE_SUCCESS,
  CUSTOM_BASE_DELETE_FAIL,
} from '../constants/customBaseConstants'

export const customBaseListReducer = (state = { customBases: [] }, action) => {
  switch (action.type) {
    case CUSTOM_BASE_REQUEST:
      return {
        loading: true,
        customBases: [],
      }
    case CUSTOM_BASE_SUCCESS:
      return {
        loading: false,
        customBases: action.payload,
      }
    case CUSTOM_BASE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customBaseDetailsReducer = (
  state = { customBase: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_BASE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_BASE_DETAILS_SUCCESS:
      return {
        loading: false,
        customBase: action.payload,
      }
    case CUSTOM_BASE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customBaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_BASE_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_BASE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customBase: action.payload,
      }
    case CUSTOM_BASE_CREATE_FAIL:
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

export const customBaseUpdateReducer = (state = { customBase: {} }, action) => {
  switch (action.type) {
    case CUSTOM_BASE_UPDATE_REQUEST:
      return {
        loading: true,
        customBase: {},
      }
    case CUSTOM_BASE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customBase: action.payload,
      }
    case CUSTOM_BASE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_BASE_UPDATE_RESET:
      return {
        customBase: {},
      }
    default:
      return state
  }
}

export const customBaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_BASE_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_BASE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CUSTOM_BASE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
