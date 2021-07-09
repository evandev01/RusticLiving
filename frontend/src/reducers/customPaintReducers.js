import {
  CUSTOM_PAINT_REQUEST,
  CUSTOM_PAINT_SUCCESS,
  CUSTOM_PAINT_FAIL,
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
