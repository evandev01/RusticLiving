import {
  BEDFRAME_PRICE_REQUEST,
  BEDFRAME_PRICE_SUCCESS,
  BEDFRAME_PRICE_FAIL,
  BEDFRAME_PRICE_UPDATE_REQUEST,
  BEDFRAME_PRICE_UPDATE_SUCCESS,
  BEDFRAME_PRICE_UPDATE_FAIL,
  BEDFRAME_PRICE_UPDATE_RESET,
  BEDFRAME_PRICE_DETAILS_REQUEST,
  BEDFRAME_PRICE_DETAILS_SUCCESS,
  BEDFRAME_PRICE_DETAILS_FAIL,
  BEDFRAME_PRICE_CREATE_REQUEST,
  BEDFRAME_PRICE_CREATE_SUCCESS,
  BEDFRAME_PRICE_CREATE_FAIL,
  BEDFRAME_PRICE_CREATE_RESET,
  BEDFRAME_PRICE_DELETE_REQUEST,
  BEDFRAME_PRICE_DELETE_SUCCESS,
  BEDFRAME_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/bedFramePriceConstants'

export const bedFramePriceListReducer = (
  state = { bedFramePrices: [] },
  action
) => {
  switch (action.type) {
    case BEDFRAME_PRICE_REQUEST:
      return {
        loading: true,
        bedFramePrices: [],
      }
    case BEDFRAME_PRICE_SUCCESS:
      return {
        loading: false,
        bedFramePrices: action.payload,
      }
    case BEDFRAME_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bedFramePriceDetailsReducer = (
  state = { bedFramePrice: {} },
  action
) => {
  switch (action.type) {
    case BEDFRAME_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case BEDFRAME_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        bedFramePrice: action.payload,
      }
    case BEDFRAME_PRICE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bedFramePriceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BEDFRAME_PRICE_CREATE_REQUEST:
      return { loading: true }
    case BEDFRAME_PRICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bedFramePrice: action.payload,
      }
    case BEDFRAME_PRICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BEDFRAME_PRICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bedFramePriceUpdateReducer = (
  state = { bedFramePrice: {} },
  action
) => {
  switch (action.type) {
    case BEDFRAME_PRICE_UPDATE_REQUEST:
      return { loading: true }
    case BEDFRAME_PRICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bedFramePrice: action.payload,
      }
    case BEDFRAME_PRICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BEDFRAME_PRICE_UPDATE_RESET:
      return { bedFramePrice: {} }
    default:
      return state
  }
}

export const bedFramePriceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BEDFRAME_PRICE_DELETE_REQUEST:
      return { loading: true }
    case BEDFRAME_PRICE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BEDFRAME_PRICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
