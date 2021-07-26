import axios from 'axios'
import {
  PAINT_REQUEST,
  PAINT_SUCCESS,
  PAINT_FAIL,
  PAINT_UPDATE_REQUEST,
  PAINT_UPDATE_SUCCESS,
  PAINT_UPDATE_FAIL,
  PAINT_DETAILS_FAIL,
  PAINT_DETAILS_REQUEST,
  PAINT_DETAILS_SUCCESS,
  PAINT_CREATE_REQUEST,
  PAINT_CREATE_SUCCESS,
  PAINT_CREATE_FAIL,
  PAINT_DELETE_REQUEST,
  PAINT_DELETE_SUCCESS,
  PAINT_DELETE_FAIL,
} from '../../constants/customProductConstants/paintConstants'

export const listPaints = () => async dispatch => {
  try {
    dispatch({
      type: PAINT_REQUEST,
    })

    const { data } = await axios.get('/api/custom/paint')

    dispatch({
      type: PAINT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPaintDetails = id => async dispatch => {
  try {
    dispatch({
      type: PAINT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/paint/${id}`)

    dispatch({
      type: PAINT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_DETAILS_FAIL,
    })
  }
}

export const createPaint = paint => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAINT_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/paint`, paint, config)

    dispatch({
      type: PAINT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePaint = paint => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAINT_UPDATE_REQUEST,
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
      `/api/custom/paint/${paint._id}`,
      paint,
      config
    )

    dispatch({
      type: PAINT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePaint = id => async (dispatch, getState) => {
  try {
    dispatch({ type: PAINT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/paint/${id}`, config)

    dispatch({ type: PAINT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PAINT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
