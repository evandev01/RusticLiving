import axios from 'axios'
import {
  CUSTOM_PRODUCT_REQUEST,
  CUSTOM_PRODUCT_SUCCESS,
  CUSTOM_PRODUCT_FAIL,
} from '../constants/customProductConstants'

export const listCustomProducts = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_PRODUCT_REQUEST,
    })

    const { data } = await axios.get('/api/customproducts')

    dispatch({
      type: CUSTOM_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRODUCT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
