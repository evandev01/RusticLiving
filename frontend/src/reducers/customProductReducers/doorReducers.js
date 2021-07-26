import {
  DOOR_REQUEST,
  DOOR_SUCCESS,
  DOOR_FAIL,
  DOOR_UPDATE_REQUEST,
  DOOR_UPDATE_SUCCESS,
  DOOR_UPDATE_FAIL,
  DOOR_UPDATE_RESET,
  DOOR_DETAILS_REQUEST,
  DOOR_DETAILS_SUCCESS,
  DOOR_DETAILS_FAIL,
  DOOR_CREATE_REQUEST,
  DOOR_CREATE_SUCCESS,
  DOOR_CREATE_FAIL,
  DOOR_CREATE_RESET,
  DOOR_DELETE_REQUEST,
  DOOR_DELETE_SUCCESS,
  DOOR_DELETE_FAIL,
} from '../../constants/customProductConstants/doorConstants'

export const doorListReducer = (state = { doors: [] }, action) => {
  switch (action.type) {
    case DOOR_REQUEST:
      return {
        loading: true,
        doors: [],
      }
    case DOOR_SUCCESS:
      return {
        loading: false,
        doors: action.payload,
      }
    case DOOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const doorDetailsReducer = (state = { door: {} }, action) => {
  switch (action.type) {
    case DOOR_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case DOOR_DETAILS_SUCCESS:
      return {
        loading: false,
        door: action.payload,
      }
    case DOOR_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const doorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOOR_CREATE_REQUEST:
      return { loading: true }
    case DOOR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        door: action.payload,
      }
    case DOOR_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DOOR_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const doorUpdateReducer = (state = { door: {} }, action) => {
  switch (action.type) {
    case DOOR_UPDATE_REQUEST:
      return { loading: true }
    case DOOR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        door: action.payload,
      }
    case DOOR_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DOOR_UPDATE_RESET:
      return { door: {} }
    default:
      return state
  }
}

export const doorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOOR_DELETE_REQUEST:
      return { loading: true }
    case DOOR_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DOOR_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
