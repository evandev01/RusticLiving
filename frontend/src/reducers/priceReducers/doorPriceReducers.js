import {
  DOOR_PRICE_REQUEST,
  DOOR_PRICE_SUCCESS,
  DOOR_PRICE_FAIL,
  DOOR_PRICE_UPDATE_REQUEST,
  DOOR_PRICE_UPDATE_SUCCESS,
  DOOR_PRICE_UPDATE_FAIL,
  DOOR_PRICE_UPDATE_RESET,
  DOOR_PRICE_DETAILS_REQUEST,
  DOOR_PRICE_DETAILS_SUCCESS,
  DOOR_PRICE_DETAILS_FAIL,
  DOOR_PRICE_CREATE_REQUEST,
  DOOR_PRICE_CREATE_SUCCESS,
  DOOR_PRICE_CREATE_FAIL,
  DOOR_PRICE_CREATE_RESET,
  DOOR_PRICE_DELETE_REQUEST,
  DOOR_PRICE_DELETE_SUCCESS,
  DOOR_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/doorPriceConstants'

export const doorPriceListReducer = (state = { doorPrices: [] }, action) => {
  switch (action.type) {
    case DOOR_PRICE_REQUEST:
      return {
        loading: true,
        doorPrices: [],
      }
    case DOOR_PRICE_SUCCESS:
      return {
        loading: false,
        doorPrices: action.payload,
      }
    case DOOR_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const doorPriceDetailsReducer = (state = { doorPrice: {} }, action) => {
  switch (action.type) {
    case DOOR_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case DOOR_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        doorPrice: action.payload,
      }
    case DOOR_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const doorPriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOOR_PRICE_CREATE_REQUEST:
      return { loading: true }
    case DOOR_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        doorPrice: action.payload,
      }
    case DOOR_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DOOR_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const doorPriceUpdateReducer = (state = { doorPrice: {} }, action) => {
  switch (action.type) {
    case DOOR_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case DOOR_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        doorPrice: action.payload,
      }
    case DOOR_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DOOR_PRICE_UPDATE_RESET:
      return { doorPrice: {} }
    default:
      return state
  }
}

export const doorPriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOOR_PRICE_DELETE_REQUEST:
      return { loading: true }
    case DOOR_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DOOR_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
