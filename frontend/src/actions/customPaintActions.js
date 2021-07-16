import axios from 'axios'
import {
  CUSTOM_PAINT_REQUEST,
  CUSTOM_PAINT_SUCCESS,
  CUSTOM_PAINT_FAIL,
  CUSTOM_PAINT_DETAILS_REQUEST,
  CUSTOM_PAINT_DETAILS_SUCCESS,
  CUSTOM_PAINT_DETAILS_FAIL,
  CUSTOM_PAINT_CREATE_REQUEST,
  CUSTOM_PAINT_CREATE_SUCCESS,
  CUSTOM_PAINT_CREATE_FAIL,
  CUSTOM_PAINT_UPDATE_REQUEST,
  CUSTOM_PAINT_UPDATE_SUCCESS,
  CUSTOM_PAINT_UPDATE_FAIL,
  CUSTOM_PAINT_DELETE_REQUEST,
  CUSTOM_PAINT_DELETE_SUCCESS,
  CUSTOM_PAINT_DELETE_FAIL,
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

export const listCustomPaintDetails = id => async dispatch => {
  try {
    dispatch({ type: CUSTOM_PAINT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/custompaints/${id}`)

    dispatch({
      type: CUSTOM_PAINT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PAINT_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCustomPaint = customPaint => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_PAINT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/custompaints', customPaint, config)

    dispatch({
      type: CUSTOM_PAINT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PAINT_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCustomPaint = customPaint => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_PAINT_UPDATE_REQUEST })

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
      `/api/custompaints/${customPaint._id}`,
      customPaint,
      config
    )

    dispatch({
      type: CUSTOM_PAINT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_PAINT_UPDATE_FAIL,
      error:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCustomPaint = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_PAINT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custompaints/${id}`, config)

    dispatch({ type: CUSTOM_PAINT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_PAINT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
