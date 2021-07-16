import axios from 'axios'
import {
  CUSTOM_PRODUCT_REQUEST,
  CUSTOM_PRODUCT_SUCCESS,
  CUSTOM_PRODUCT_FAIL,
  CUSTOM_PRODUCT_UPDATE_REQUEST,
  CUSTOM_PRODUCT_UPDATE_SUCCESS,
  CUSTOM_PRODUCT_UPDATE_FAIL,
  CUSTOM_PRODUCT_DETAILS_FAIL,
  CUSTOM_PRODUCT_DETAILS_REQUEST,
  CUSTOM_PRODUCT_DETAILS_SUCCESS,
  CUSTOM_PRODUCT_CREATE_REQUEST,
  CUSTOM_PRODUCT_CREATE_SUCCESS,
  CUSTOM_PRODUCT_CREATE_FAIL,
  CUSTOM_PRODUCT_DELETE_REQUEST,
  CUSTOM_PRODUCT_DELETE_SUCCESS,
  CUSTOM_PRODUCT_DELETE_FAIL,
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

export const listCustomProductDetails = id => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_PRODUCT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customproducts/${id}`)

    dispatch({
      type: CUSTOM_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRODUCT_DETAILS_FAIL,
    })
  }
}

export const createCustomProduct =
  customProduct => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_PRODUCT_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/customproducts`,
        customProduct,
        config
      )

      dispatch({
        type: CUSTOM_PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_PRODUCT_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateCustomProduct =
  customProduct => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_PRODUCT_UPDATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/customproducts/${customProduct._id}`,
        customProduct,
        config
      )

      dispatch({
        type: CUSTOM_PRODUCT_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_PRODUCT_UPDATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteCustomProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customproducts/${id}`, config)

    dispatch({ type: CUSTOM_PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRODUCT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
