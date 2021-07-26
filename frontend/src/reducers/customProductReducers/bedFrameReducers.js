import {
  BEDFRAME_REQUEST,
  BEDFRAME_SUCCESS,
  BEDFRAME_FAIL,
  BEDFRAME_UPDATE_REQUEST,
  BEDFRAME_UPDATE_SUCCESS,
  BEDFRAME_UPDATE_FAIL,
  BEDFRAME_UPDATE_RESET,
  BEDFRAME_DETAILS_REQUEST,
  BEDFRAME_DETAILS_SUCCESS,
  BEDFRAME_DETAILS_FAIL,
  BEDFRAME_CREATE_REQUEST,
  BEDFRAME_CREATE_SUCCESS,
  BEDFRAME_CREATE_FAIL,
  BEDFRAME_CREATE_RESET,
  BEDFRAME_DELETE_REQUEST,
  BEDFRAME_DELETE_SUCCESS,
  BEDFRAME_DELETE_FAIL,
} from '../../constants/customProductConstants/bedFrameConstants'

export const bedFrameListReducer = (state = { bedFrames: [] }, action) => {
  switch (action.type) {
    case BEDFRAME_REQUEST:
      return {
        loading: true,
        bedFrames: [],
      }
    case BEDFRAME_SUCCESS:
      return {
        loading: false,
        bedFrames: action.payload,
      }
    case BEDFRAME_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bedFrameDetailsReducer = (state = { bedFrame: {} }, action) => {
  switch (action.type) {
    case BEDFRAME_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case BEDFRAME_DETAILS_SUCCESS:
      return {
        loading: false,
        bedFrame: action.payload,
      }
    case BEDFRAME_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const bedFrameCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BEDFRAME_CREATE_REQUEST:
      return { loading: true }
    case BEDFRAME_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bedFrame: action.payload,
      }
    case BEDFRAME_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BEDFRAME_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bedFrameUpdateReducer = (state = { bedFrame: {} }, action) => {
  switch (action.type) {
    case BEDFRAME_UPDATE_REQUEST:
      return { loading: true }
    case BEDFRAME_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bedFrame: action.payload,
      }
    case BEDFRAME_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BEDFRAME_UPDATE_RESET:
      return { bedFrame: {} }
    default:
      return state
  }
}

export const bedFrameDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BEDFRAME_DELETE_REQUEST:
      return { loading: true }
    case BEDFRAME_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BEDFRAME_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
