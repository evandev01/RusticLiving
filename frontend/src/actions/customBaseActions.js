import axios from 'axios'
import {
  CUSTOM_BASE_REQUEST,
  CUSTOM_BASE_SUCCESS,
  CUSTOM_BASE_FAIL,
  CUSTOM_BASE_DETAILS_REQUEST,
  CUSTOM_BASE_DETAILS_SUCCESS,
  CUSTOM_BASE_DETAILS_FAIL,
  CUSTOM_BASE_CREATE_REQUEST,
  CUSTOM_BASE_CREATE_SUCCESS,
  CUSTOM_BASE_CREATE_FAIL,
  CUSTOM_BASE_UPDATE_REQUEST,
  CUSTOM_BASE_UPDATE_SUCCESS,
  CUSTOM_BASE_UPDATE_FAIL,
  CUSTOM_BASE_DELETE_REQUEST,
  CUSTOM_BASE_DELETE_SUCCESS,
  CUSTOM_BASE_DELETE_FAIL,
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

export const listCustomBaseDetails = id => async dispatch => {
  try {
    dispatch({ type: CUSTOM_BASE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/custombases/${id}`)

    dispatch({
      type: CUSTOM_BASE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_BASE_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCustomBase = customBase => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_BASE_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/custombases', customBase, config)

    dispatch({
      type: CUSTOM_BASE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_BASE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCustomBase = customBase => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_BASE_UPDATE_REQUEST })

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
      `/api/custombases/${customBase._id}`,
      customBase,
      config
    )

    dispatch({
      type: CUSTOM_BASE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_BASE_UPDATE_FAIL,
      error:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCustomBase = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_BASE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custombases/${id}`, config)

    dispatch({ type: CUSTOM_BASE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_BASE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
