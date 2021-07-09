import axios from 'axios'
import {
  CUSTOM_ACCENT_REQUEST,
  CUSTOM_ACCENT_SUCCESS,
  CUSTOM_ACCENT_FAIL,
} from '../constants/customAccentConstants'

export const listCustomAccents = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_ACCENT_REQUEST,
    })

    const { data } = await axios.get('/api/customaccents')

    dispatch({
      type: CUSTOM_ACCENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_ACCENT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
