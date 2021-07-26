import {
  PAINT_REQUEST,
  PAINT_SUCCESS,
  PAINT_FAIL,
  PAINT_DETAILS_REQUEST,
  PAINT_DETAILS_SUCCESS,
  PAINT_DETAILS_FAIL,
  PAINT_CREATE_REQUEST,
  PAINT_CREATE_SUCCESS,
  PAINT_CREATE_FAIL,
  PAINT_CREATE_RESET,
  PAINT_UPDATE_REQUEST,
  PAINT_UPDATE_SUCCESS,
  PAINT_UPDATE_FAIL,
  PAINT_UPDATE_RESET,
  PAINT_DELETE_REQUEST,
  PAINT_DELETE_SUCCESS,
  PAINT_DELETE_FAIL,
} from '../../constants/customProductConstants/paintConstants'

export const paintListReducer = (state = { paints: [] }, action) => {
  switch (action.type) {
    case PAINT_REQUEST:
      return {
        loading: true,
        paints: [],
      }
    case PAINT_SUCCESS:
      return {
        loading: false,
        paints: action.payload,
      }
    case PAINT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const paintDetailsReducer = (state = { paint: {} }, action) => {
  switch (action.type) {
    case PAINT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case PAINT_DETAILS_SUCCESS:
      return {
        loading: false,
        paint: action.payload,
      }
    case PAINT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const paintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAINT_CREATE_REQUEST:
      return { loading: true }
    case PAINT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        paint: action.payload,
      }
    case PAINT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PAINT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const paintUpdateReducer = (state = { paint: {} }, action) => {
  switch (action.type) {
    case PAINT_UPDATE_REQUEST:
      return {
        loading: true,
        paint: {},
      }
    case PAINT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        paint: action.payload,
      }
    case PAINT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PAINT_UPDATE_RESET:
      return {
        paint: {},
      }
    default:
      return state
  }
}

export const paintDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAINT_DELETE_REQUEST:
      return { loading: true }
    case PAINT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PAINT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
