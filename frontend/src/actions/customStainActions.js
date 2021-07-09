import axios from 'axios'
import {
  CUSTOM_STAIN_REQUEST,
  CUSTOM_STAIN_SUCCESS,
  CUSTOM_STAIN_FAIL,
} from '../constants/customStainConstants'

export const listCustomStains = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_STAIN_REQUEST,
    })

    const { data } = await axios.get('/api/customstains')

    dispatch({
      type: CUSTOM_STAIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
