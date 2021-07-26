import {
  TABLE_REQUEST,
  TABLE_SUCCESS,
  TABLE_FAIL,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_UPDATE_RESET,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_DETAILS_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_CREATE_FAIL,
  TABLE_CREATE_RESET,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_SUCCESS,
  TABLE_DELETE_FAIL,
} from '../../constants/customProductConstants/tableConstants'

export const tableListReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLE_REQUEST:
      return {
        loading: true,
        tables: [],
      }
    case TABLE_SUCCESS:
      return {
        loading: false,
        tables: action.payload,
      }
    case TABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tableDetailsReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case TABLE_DETAILS_SUCCESS:
      return {
        loading: false,
        table: action.payload,
      }
    case TABLE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tableCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_CREATE_REQUEST:
      return { loading: true }
    case TABLE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        table: action.payload,
      }
    case TABLE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case TABLE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const tableUpdateReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLE_UPDATE_REQUEST:
      return { loading: true }
    case TABLE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        table: action.payload,
      }
    case TABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TABLE_UPDATE_RESET:
      return { table: {} }
    default:
      return state
  }
}

export const tableDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_DELETE_REQUEST:
      return { loading: true }
    case TABLE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TABLE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
