import axios from 'axios'
import {
  CUSTOM_PRE_ORDER_ADD_REQUEST,
  CUSTOM_PRE_ORDER_ADD_SUCCESS,
  CUSTOM_PRE_ORDER_ADD_FAIL,
  CUSTOM_PRE_ORDER_LIST_REQUEST,
  CUSTOM_PRE_ORDER_LIST_SUCCESS,
  CUSTOM_PRE_ORDER_LIST_FAIL,
  CUSTOM_PRE_ORDER_UPDATE_REQUEST,
  CUSTOM_PRE_ORDER_UPDATE_SUCCESS,
  CUSTOM_PRE_ORDER_UPDATE_FAIL,
  CUSTOM_PRE_ORDER_DELETE_REQUEST,
  CUSTOM_PRE_ORDER_DELETE_SUCCESS,
  CUSTOM_PRE_ORDER_DELETE_FAIL,
  CUSTOM_PRE_ORDER_DETAILS_REQUEST,
  CUSTOM_PRE_ORDER_DETAILS_SUCCESS,
  CUSTOM_PRE_ORDER_DETAILS_FAIL,
} from '../../../constants/customPreOrderConstants/customPreOrderConstants'

export const listCustomPreOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOM_PRE_ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/custompreorders', config)

    dispatch({
      type: CUSTOM_PRE_ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRE_ORDER_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCustomPreOrderDetails = id => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_PRE_ORDER_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custompreorders/${id}`)

    dispatch({
      type: CUSTOM_PRE_ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRE_ORDER_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveCustomPreOrder =
  customPreOrder => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_PRE_ORDER_ADD_REQUEST,
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
        `/api/custompreorders`,
        customPreOrder,
        config
      )

      dispatch({
        type: CUSTOM_PRE_ORDER_ADD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_PRE_ORDER_ADD_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateCustomPreOrder =
  customPreOrder => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_PRE_ORDER_UPDATE_REQUEST,
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
        `/api/custompreorders/${customPreOrder._id}`,
        customPreOrder,
        config
      )

      dispatch({
        type: CUSTOM_PRE_ORDER_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_PRE_ORDER_UPDATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteCustomPreOrder = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_PRE_ORDER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custompreorders/${id}`, config)

    dispatch({ type: CUSTOM_PRE_ORDER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_PRE_ORDER_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
