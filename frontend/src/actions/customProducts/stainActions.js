import axios from 'axios'
import {
  STAIN_REQUEST,
  STAIN_SUCCESS,
  STAIN_FAIL,
  STAIN_UPDATE_REQUEST,
  STAIN_UPDATE_SUCCESS,
  STAIN_UPDATE_FAIL,
  STAIN_DETAILS_FAIL,
  STAIN_DETAILS_REQUEST,
  STAIN_DETAILS_SUCCESS,
  STAIN_CREATE_REQUEST,
  STAIN_CREATE_SUCCESS,
  STAIN_CREATE_FAIL,
  STAIN_DELETE_REQUEST,
  STAIN_DELETE_SUCCESS,
  STAIN_DELETE_FAIL,
} from '../../constants/customProductConstants/stainConstants'

export const listStains = () => async dispatch => {
  try {
    dispatch({
      type: STAIN_REQUEST,
    })

    const { data } = await axios.get('/api/custom/stain')

    dispatch({
      type: STAIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listStainDetails = id => async dispatch => {
  try {
    dispatch({
      type: STAIN_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/stain/${id}`)

    dispatch({
      type: STAIN_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_DETAILS_FAIL,
    })
  }
}

export const createStain = stain => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAIN_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/stain`, stain, config)

    dispatch({
      type: STAIN_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateStain = stain => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAIN_UPDATE_REQUEST,
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
      `/api/custom/stain/${stain._id}`,
      stain,
      config
    )

    dispatch({
      type: STAIN_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStain = id => async (dispatch, getState) => {
  try {
    dispatch({ type: STAIN_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/stain/${id}`, config)

    dispatch({ type: STAIN_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: STAIN_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
