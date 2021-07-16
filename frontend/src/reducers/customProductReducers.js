import {
  CUSTOM_PRODUCT_REQUEST,
  CUSTOM_PRODUCT_SUCCESS,
  CUSTOM_PRODUCT_FAIL,
  CUSTOM_PRODUCT_UPDATE_REQUEST,
  CUSTOM_PRODUCT_UPDATE_SUCCESS,
  CUSTOM_PRODUCT_UPDATE_FAIL,
  CUSTOM_PRODUCT_UPDATE_RESET,
  CUSTOM_PRODUCT_DETAILS_REQUEST,
  CUSTOM_PRODUCT_DETAILS_SUCCESS,
  CUSTOM_PRODUCT_DETAILS_FAIL,
  CUSTOM_PRODUCT_CREATE_REQUEST,
  CUSTOM_PRODUCT_CREATE_SUCCESS,
  CUSTOM_PRODUCT_CREATE_FAIL,
  CUSTOM_PRODUCT_CREATE_RESET,
  CUSTOM_PRODUCT_DELETE_REQUEST,
  CUSTOM_PRODUCT_DELETE_SUCCESS,
  CUSTOM_PRODUCT_DELETE_FAIL,
} from '../constants/customProductConstants'

export const customProductListReducer = (
  state = { customProducts: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_REQUEST:
      return {
        loading: true,
        customProducts: [],
      }
    case CUSTOM_PRODUCT_SUCCESS:
      return {
        loading: false,
        customProducts: action.payload,
      }
    case CUSTOM_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customProductDetailsReducer = (
  state = { customProduct: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        customProduct: action.payload,
      }
    case CUSTOM_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customProduct: action.payload,
      }
    case CUSTOM_PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const customProductUpdateReducer = (
  state = { customProduct: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case CUSTOM_PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customProduct: action.payload,
      }
    case CUSTOM_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_PRODUCT_UPDATE_RESET:
      return { customProduct: {} }
    default:
      return state
  }
}

export const customProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CUSTOM_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
