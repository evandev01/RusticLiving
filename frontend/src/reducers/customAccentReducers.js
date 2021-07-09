import {
  CUSTOM_ACCENT_REQUEST,
  CUSTOM_ACCENT_SUCCESS,
  CUSTOM_ACCENT_FAIL,
} from '../constants/customAccentConstants'

export const customAccentListReducer = (
  state = { customAccents: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_ACCENT_REQUEST:
      return {
        loading: true,
        accents: [],
      }
    case CUSTOM_ACCENT_SUCCESS:
      return {
        loading: false,
        customAccents: action.payload,
      }
    case CUSTOM_ACCENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
