import {
  TABLE_PRICE_REQUEST,
  TABLE_PRICE_SUCCESS,
  TABLE_PRICE_FAIL,
  TABLE_PRICE_UPDATE_REQUEST,
  TABLE_PRICE_UPDATE_SUCCESS,
  TABLE_PRICE_UPDATE_FAIL,
  TABLE_PRICE_UPDATE_RESET,
  TABLE_PRICE_DETAILS_REQUEST,
  TABLE_PRICE_DETAILS_SUCCESS,
  TABLE_PRICE_DETAILS_FAIL,
  TABLE_PRICE_CREATE_REQUEST,
  TABLE_PRICE_CREATE_SUCCESS,
  TABLE_PRICE_CREATE_FAIL,
  TABLE_PRICE_CREATE_RESET,
  TABLE_PRICE_DELETE_REQUEST,
  TABLE_PRICE_DELETE_SUCCESS,
  TABLE_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/tablePriceConstants'

export const tablePriceListReducer = (state = { tablePrices: [] }, action) => {
  switch (action.type) {
    case TABLE_PRICE_REQUEST:
      return {
        loading: true,
        tablePrices: [],
      }
    case TABLE_PRICE_SUCCESS:
      return {
        loading: false,
        tablePrices: action.payload,
      }
    case TABLE_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tablePriceDetailsReducer = (
  state = { tablePrice: {} },
  action
) => {
  switch (action.type) {
    case TABLE_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case TABLE_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        tablePrice: action.payload,
      }
    case TABLE_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tablePriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_PRICE_CREATE_REQUEST:
      return { loading: true }
    case TABLE_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        tablePrice: action.payload,
      }
    case TABLE_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case TABLE_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const tablePriceUpdateReducer = (state = { tablePrice: {} }, action) => {
  switch (action.type) {
    case TABLE_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case TABLE_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        tablePrice: action.payload,
      }
    case TABLE_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TABLE_PRICE_UPDATE_RESET:
      return { tablePrice: {} }
    default:
      return state
  }
}

export const tablePriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_PRICE_DELETE_REQUEST:
      return { loading: true }
    case TABLE_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TABLE_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
