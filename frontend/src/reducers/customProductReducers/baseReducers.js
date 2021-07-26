import {
  BASE_REQUEST,
  BASE_SUCCESS,
  BASE_FAIL,
  BASE_DETAILS_REQUEST,
  BASE_DETAILS_SUCCESS,
  BASE_DETAILS_FAIL,
  BASE_CREATE_REQUEST,
  BASE_CREATE_SUCCESS,
  BASE_CREATE_FAIL,
  BASE_CREATE_RESET,
  BASE_UPDATE_REQUEST,
  BASE_UPDATE_SUCCESS,
  BASE_UPDATE_FAIL,
  BASE_UPDATE_RESET,
  BASE_DELETE_REQUEST,
  BASE_DELETE_SUCCESS,
  BASE_DELETE_FAIL,
} from '../../constants/customProductConstants/baseConstants'

export const baseListReducer = (state = { bases: [] }, action) => {
  switch (action.type) {
    case BASE_REQUEST:
      return {
        loading: true,
        bases: [],
      }
    case BASE_SUCCESS:
      return {
        loading: false,
        bases: action.payload,
      }
    case BASE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const baseDetailsReducer = (state = { base: {} }, action) => {
  switch (action.type) {
    case BASE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case BASE_DETAILS_SUCCESS:
      return {
        loading: false,
        base: action.payload,
      }
    case BASE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const baseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BASE_CREATE_REQUEST:
      return { loading: true }
    case BASE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        base: action.payload,
      }
    case BASE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case BASE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const baseUpdateReducer = (state = { base: {} }, action) => {
  switch (action.type) {
    case BASE_UPDATE_REQUEST:
      return {
        loading: true,
        base: {},
      }
    case BASE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        base: action.payload,
      }
    case BASE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case BASE_UPDATE_RESET:
      return {
        base: {},
      }
    default:
      return state
  }
}

export const baseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BASE_DELETE_REQUEST:
      return { loading: true }
    case BASE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case BASE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
