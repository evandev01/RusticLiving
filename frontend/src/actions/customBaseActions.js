import axios from 'axios'
import {
  CUSTOM_BASE_REQUEST,
  CUSTOM_BASE_SUCCESS,
  CUSTOM_BASE_FAIL,
} from '../constants/customBaseConstants'

export const listCustomBases = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_BASE_REQUEST,
    })

    const { data } = await axios.get('/api/custombases')

    dispatch({
      type: CUSTOM_BASE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_BASE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
