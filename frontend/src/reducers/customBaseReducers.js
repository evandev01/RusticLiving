import {
  CUSTOM_BASE_REQUEST,
  CUSTOM_BASE_SUCCESS,
  CUSTOM_BASE_FAIL,
} from '../constants/customBaseConstants'

export const customBaseListReducer = (state = { customBases: [] }, action) => {
  switch (action.type) {
    case CUSTOM_BASE_REQUEST:
      return {
        loading: true,
        customBases: [],
      }
    case CUSTOM_BASE_SUCCESS:
      return {
        loading: false,
        customBases: action.payload,
      }
    case CUSTOM_BASE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
