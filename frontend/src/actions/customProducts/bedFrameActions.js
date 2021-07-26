import axios from 'axios'
import {
  BEDFRAME_REQUEST,
  BEDFRAME_SUCCESS,
  BEDFRAME_FAIL,
  BEDFRAME_UPDATE_REQUEST,
  BEDFRAME_UPDATE_SUCCESS,
  BEDFRAME_UPDATE_FAIL,
  BEDFRAME_DETAILS_FAIL,
  BEDFRAME_DETAILS_REQUEST,
  BEDFRAME_DETAILS_SUCCESS,
  BEDFRAME_CREATE_REQUEST,
  BEDFRAME_CREATE_SUCCESS,
  BEDFRAME_CREATE_FAIL,
  BEDFRAME_DELETE_REQUEST,
  BEDFRAME_DELETE_SUCCESS,
  BEDFRAME_DELETE_FAIL,
} from '../../constants/customProductConstants/bedFrameConstants'

export const listBedFrames = () => async dispatch => {
  try {
    dispatch({
      type: BEDFRAME_REQUEST,
    })

    const { data } = await axios.get('/api/custom/bedframe')

    dispatch({
      type: BEDFRAME_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBedFrameDetails = id => async dispatch => {
  try {
    dispatch({
      type: BEDFRAME_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/bedframe/${id}`)

    dispatch({
      type: BEDFRAME_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_DETAILS_FAIL,
    })
  }
}

export const createBedFrame = bedFrame => async (dispatch, getState) => {
  try {
    dispatch({
      type: BEDFRAME_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/bedframe`, bedFrame, config)

    dispatch({
      type: BEDFRAME_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBedFrame = bedFrame => async (dispatch, getState) => {
  try {
    dispatch({
      type: BEDFRAME_UPDATE_REQUEST,
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
      `/api/custom/bedframe/${bedFrame._id}`,
      bedFrame,
      config
    )

    dispatch({
      type: BEDFRAME_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBedFrame = id => async (dispatch, getState) => {
  try {
    dispatch({ type: BEDFRAME_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/bedframe/${id}`, config)

    dispatch({ type: BEDFRAME_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: BEDFRAME_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
