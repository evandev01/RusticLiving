import {
  CUSTOM_STAIN_REQUEST,
  CUSTOM_STAIN_SUCCESS,
  CUSTOM_STAIN_FAIL,
} from '../constants/customStainConstants'

export const customStainListReducer = (
  state = { customStains: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_STAIN_REQUEST:
      return {
        loading: true,
        customStains: [],
      }
    case CUSTOM_STAIN_SUCCESS:
      return {
        loading: false,
        customStains: action.payload,
      }
    case CUSTOM_STAIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
