import {
  CUSTOM_PRODUCT_REQUEST,
  CUSTOM_PRODUCT_SUCCESS,
  CUSTOM_PRODUCT_FAIL,
} from '../constants/customProductConstants'

export const customProductListReducer = (
  state = { customProducts: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_PRODUCT_REQUEST:
      return {
        loading: true,
        customProducts: [],
      }
    case CUSTOM_PRODUCT_SUCCESS:
      return {
        loading: false,
        customProducts: action.payload,
      }
    case CUSTOM_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
