import {
  EST_COMP_LIST_REQUEST,
  EST_COMP_LIST_SUCCESS,
  EST_COMP_LIST_FAIL,
  EST_COMP_CREATE_REQUEST,
  EST_COMP_CREATE_SUCCESS,
  EST_COMP_CREATE_FAIL,
  EST_COMP_CREATE_RESET,
  EST_COMP_DETAILS_REQUEST,
  EST_COMP_DETAILS_SUCCESS,
  EST_COMP_DETAILS_FAIL,
  EST_COMP_UPDATE_REQUEST,
  EST_COMP_UPDATE_SUCCESS,
  EST_COMP_UPDATE_FAIL,
  EST_COMP_UPDATE_RESET,
  EST_COMP_DELETE_REQUEST,
  EST_COMP_DELETE_SUCCESS,
  EST_COMP_DELETE_FAIL,
} from '../../constants/customProductConstants/estCompConstants'

export const estCompListReducer = (state = { estCompDates: [] }, action) => {
  switch (action.type) {
    case EST_COMP_LIST_REQUEST:
      return {
        loading: true,
        estCompDates: [],
      }
    case EST_COMP_LIST_SUCCESS:
      return {
        loading: false,
        estCompDates: action.payload,
      }
    case EST_COMP_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const estCompDetailsReducer = (state = { estCompDate: {} }, action) => {
  switch (action.type) {
    case EST_COMP_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case EST_COMP_DETAILS_SUCCESS:
      return {
        loading: false,
        estCompDate: action.payload,
      }
    case EST_COMP_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const estCompCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EST_COMP_CREATE_REQUEST:
      return { loading: true }
    case EST_COMP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        estCompDate: action.payload,
      }
    case EST_COMP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EST_COMP_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const estCompUpdateReducer = (state = { estCompDate: {} }, action) => {
  switch (action.type) {
    case EST_COMP_UPDATE_REQUEST:
      return {
        loading: true,
        estCompDate: {},
      }
    case EST_COMP_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        estCompDate: action.payload,
      }
    case EST_COMP_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EST_COMP_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const estCompDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EST_COMP_DELETE_REQUEST:
      return { loading: true }
    case EST_COMP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case EST_COMP_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
