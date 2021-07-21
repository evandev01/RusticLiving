import {
  STAIN_PRICE_REQUEST,
  STAIN_PRICE_SUCCESS,
  STAIN_PRICE_FAIL,
  STAIN_PRICE_UPDATE_REQUEST,
  STAIN_PRICE_UPDATE_SUCCESS,
  STAIN_PRICE_UPDATE_FAIL,
  STAIN_PRICE_UPDATE_RESET,
  STAIN_PRICE_DETAILS_REQUEST,
  STAIN_PRICE_DETAILS_SUCCESS,
  STAIN_PRICE_DETAILS_FAIL,
  STAIN_PRICE_CREATE_REQUEST,
  STAIN_PRICE_CREATE_SUCCESS,
  STAIN_PRICE_CREATE_FAIL,
  STAIN_PRICE_CREATE_RESET,
  STAIN_PRICE_DELETE_REQUEST,
  STAIN_PRICE_DELETE_SUCCESS,
  STAIN_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/stainPriceConstants'

export const stainPriceListReducer = (state = { stainPrices: [] }, action) => {
  switch (action.type) {
    case STAIN_PRICE_REQUEST:
      return {
        loading: true,
        stainPrices: [],
      }
    case STAIN_PRICE_SUCCESS:
      return {
        loading: false,
        stainPrices: action.payload,
      }
    case STAIN_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const stainPriceDetailsReducer = (
  state = { stainPrice: {} },
  action
) => {
  switch (action.type) {
    case STAIN_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case STAIN_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        stainPrice: action.payload,
      }
    case STAIN_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const stainPriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STAIN_PRICE_CREATE_REQUEST:
      return { loading: true }
    case STAIN_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stainPrice: action.payload,
      }
    case STAIN_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STAIN_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const stainPriceUpdateReducer = (state = { stainPrice: {} }, action) => {
  switch (action.type) {
    case STAIN_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case STAIN_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stainPrice: action.payload,
      }
    case STAIN_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STAIN_PRICE_UPDATE_RESET:
      return { stainPrice: {} }
    default:
      return state
  }
}

export const stainPriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAIN_PRICE_DELETE_REQUEST:
      return { loading: true }
    case STAIN_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case STAIN_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
