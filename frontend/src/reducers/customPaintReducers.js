import { CUSTOM_ACCENT_CREATE_RESET } from '../constants/customAccentConstants'
import {
  CUSTOM_PAINT_REQUEST,
  CUSTOM_PAINT_SUCCESS,
  CUSTOM_PAINT_FAIL,
  CUSTOM_PAINT_DETAILS_REQUEST,
  CUSTOM_PAINT_DETAILS_SUCCESS,
  CUSTOM_PAINT_DETAILS_FAIL,
  CUSTOM_PAINT_CREATE_REQUEST,
  CUSTOM_PAINT_CREATE_SUCCESS,
  CUSTOM_PAINT_CREATE_FAIL,
  CUSTOM_PAINT_UPDATE_REQUEST,
  CUSTOM_PAINT_UPDATE_SUCCESS,
  CUSTOM_PAINT_UPDATE_FAIL,
  CUSTOM_PAINT_UPDATE_RESET,
  CUSTOM_PAINT_DELETE_REQUEST,
  CUSTOM_PAINT_DELETE_SUCCESS,
  CUSTOM_PAINT_DELETE_FAIL,
} from '../constants/customPaintConstants'

export const customPaintListReducer = (
  state = { customPaints: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_PAINT_REQUEST:
      return {
        loading: true,
        customPaints: [],
      }
    case CUSTOM_PAINT_SUCCESS:
      return {
        loading: false,
        customPaints: action.payload,
      }
    case CUSTOM_PAINT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customPaintDetailsReducer = (
  state = { customPaint: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PAINT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_PAINT_DETAILS_SUCCESS:
      return {
        loading: false,
        customPaint: action.payload,
      }
    case CUSTOM_PAINT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customPaintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PAINT_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_PAINT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customPaint: action.payload,
      }
    case CUSTOM_PAINT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_ACCENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const customPaintUpdateReducer = (
  state = { customPaint: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_PAINT_UPDATE_REQUEST:
      return {
        loading: true,
        customPaint: {},
      }
    case CUSTOM_PAINT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customPaint: action.payload,
      }
    case CUSTOM_PAINT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CUSTOM_PAINT_UPDATE_RESET:
      return {
        customPaint: {},
      }
    default:
      return state
  }
}

export const customPaintDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_PAINT_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_PAINT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CUSTOM_PAINT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
