import {
  PAINT_PRICE_REQUEST,
  PAINT_PRICE_SUCCESS,
  PAINT_PRICE_FAIL,
  PAINT_PRICE_UPDATE_REQUEST,
  PAINT_PRICE_UPDATE_SUCCESS,
  PAINT_PRICE_UPDATE_FAIL,
  PAINT_PRICE_UPDATE_RESET,
  PAINT_PRICE_DETAILS_REQUEST,
  PAINT_PRICE_DETAILS_SUCCESS,
  PAINT_PRICE_DETAILS_FAIL,
  PAINT_PRICE_CREATE_REQUEST,
  PAINT_PRICE_CREATE_SUCCESS,
  PAINT_PRICE_CREATE_FAIL,
  PAINT_PRICE_CREATE_RESET,
  PAINT_PRICE_DELETE_REQUEST,
  PAINT_PRICE_DELETE_SUCCESS,
  PAINT_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/paintPriceConstants'

export const paintPriceListReducer = (state = { paintPrices: [] }, action) => {
  switch (action.type) {
    case PAINT_PRICE_REQUEST:
      return {
        loading: true,
        paintPrices: [],
      }
    case PAINT_PRICE_SUCCESS:
      return {
        loading: false,
        paintPrices: action.payload,
      }
    case PAINT_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const paintPriceDetailsReducer = (
  state = { paintPrice: {} },
  action
) => {
  switch (action.type) {
    case PAINT_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case PAINT_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        paintPrice: action.payload,
      }
    case PAINT_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const paintPriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAINT_PRICE_CREATE_REQUEST:
      return { loading: true }
    case PAINT_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        paintPrice: action.payload,
      }
    case PAINT_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PAINT_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const paintPriceUpdateReducer = (state = { paintPrice: {} }, action) => {
  switch (action.type) {
    case PAINT_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case PAINT_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        paintPrice: action.payload,
      }
    case PAINT_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PAINT_PRICE_UPDATE_RESET:
      return { paintPrice: {} }
    default:
      return state
  }
}

export const paintPriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAINT_PRICE_DELETE_REQUEST:
      return { loading: true }
    case PAINT_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PAINT_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
