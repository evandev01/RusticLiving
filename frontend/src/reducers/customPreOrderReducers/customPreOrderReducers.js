import {
  CUSTOM_PRE_ORDER_ADD_REQUEST,
  CUSTOM_PRE_ORDER_ADD_SUCCESS,
  CUSTOM_PRE_ORDER_ADD_FAIL,
  CUSTOM_PRE_ORDER_ADD_RESET,
  CUSTOM_PRE_ORDER_LIST_REQUEST,
  CUSTOM_PRE_ORDER_LIST_SUCCESS,
  CUSTOM_PRE_ORDER_LIST_FAIL,
  CUSTOM_PRE_ORDER_UPDATE_REQUEST,
  CUSTOM_PRE_ORDER_UPDATE_SUCCESS,
  CUSTOM_PRE_ORDER_UPDATE_FAIL,
  CUSTOM_PRE_ORDER_UPDATE_RESET,
  CUSTOM_PRE_ORDER_DELETE_REQUEST,
  CUSTOM_PRE_ORDER_DELETE_SUCCESS,
  CUSTOM_PRE_ORDER_DELETE_FAIL,
  CUSTOM_PRE_ORDER_DETAILS_REQUEST,
  CUSTOM_PRE_ORDER_DETAILS_SUCCESS,
  CUSTOM_PRE_ORDER_DETAILS_FAIL,
} from '../../constants/customPreOrderConstants/customPreOrderConstants'

export const customPreOrderAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PRE_ORDER_ADD_REQUEST:
      return { loading: true }
    case CUSTOM_PRE_ORDER_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        customPreOrder: action.payload,
      }
    case CUSTOM_PRE_ORDER_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_PRE_ORDER_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const customPreOrderListReducer = (
  state = { customPreOrders: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRE_ORDER_LIST_REQUEST:
      return {
        loading: true,
        customPreOrders: [],
      }
    case CUSTOM_PRE_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        customPreOrders: action.payload,
      }
    case CUSTOM_PRE_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customPreOrderDetailsReducer = (
  state = { customPreOrders: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRE_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_PRE_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        customPreOrder: action.payload,
      }
    case CUSTOM_PRE_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customPreOrderUpdateReducer = (
  state = { customPreOrder: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRE_ORDER_UPDATE_REQUEST:
      return {
        loading: true,
        customPreOrder: {},
      }
    case CUSTOM_PRE_ORDER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customPreOrder: action.payload,
      }
    case CUSTOM_PRE_ORDER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_PRE_ORDER_UPDATE_RESET:
      return { customPreOrder: {} }
    default:
      return state
  }
}

export const customPreOrderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PRE_ORDER_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_PRE_ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CUSTOM_PRE_ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
