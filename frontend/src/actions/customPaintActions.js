import axios from 'axios'
import {
  CUSTOM_PAINT_REQUEST,
  CUSTOM_PAINT_SUCCESS,
  CUSTOM_PAINT_FAIL,
} from '../constants/customPaintConstants'

export const listCustomPaints = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_PAINT_REQUEST,
    })

    const { data } = await axios.get('/api/custompaints')

    dispatch({
      type: CUSTOM_PAINT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PAINT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
