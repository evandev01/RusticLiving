import {
  ACCENT_PRICE_REQUEST,
  ACCENT_PRICE_SUCCESS,
  ACCENT_PRICE_FAIL,
  ACCENT_PRICE_UPDATE_REQUEST,
  ACCENT_PRICE_UPDATE_SUCCESS,
  ACCENT_PRICE_UPDATE_FAIL,
  ACCENT_PRICE_UPDATE_RESET,
  ACCENT_PRICE_DETAILS_REQUEST,
  ACCENT_PRICE_DETAILS_SUCCESS,
  ACCENT_PRICE_DETAILS_FAIL,
  ACCENT_PRICE_CREATE_REQUEST,
  ACCENT_PRICE_CREATE_SUCCESS,
  ACCENT_PRICE_CREATE_FAIL,
  ACCENT_PRICE_CREATE_RESET,
  ACCENT_PRICE_DELETE_REQUEST,
  ACCENT_PRICE_DELETE_SUCCESS,
  ACCENT_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/accentPriceConstants'

export const accentPriceListReducer = (
  state = { accentPrices: [] },
  action
) => {
  switch (action.type) {
    case ACCENT_PRICE_REQUEST:
      return {
        loading: true,
        accentPrices: [],
      }
    case ACCENT_PRICE_SUCCESS:
      return {
        loading: false,
        accentPrices: action.payload,
      }
    case ACCENT_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accentPriceDetailsReducer = (
  state = { accentPrice: {} },
  action
) => {
  switch (action.type) {
    case ACCENT_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case ACCENT_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        accentPrice: action.payload,
      }
    case ACCENT_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accentPriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCENT_PRICE_CREATE_REQUEST:
      return { loading: true }
    case ACCENT_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        accentPrice: action.payload,
      }
    case ACCENT_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCENT_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const accentPriceUpdateReducer = (
  state = { accentPrice: {} },
  action
) => {
  switch (action.type) {
    case ACCENT_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case ACCENT_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        accentPrice: action.payload,
      }
    case ACCENT_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCENT_PRICE_UPDATE_RESET:
      return { accentPrice: {} }
    default:
      return state
  }
}

export const accentPriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCENT_PRICE_DELETE_REQUEST:
      return { loading: true }
    case ACCENT_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ACCENT_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
