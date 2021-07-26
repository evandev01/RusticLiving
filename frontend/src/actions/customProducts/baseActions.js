import axios from 'axios'
import {
  BASE_REQUEST,
  BASE_SUCCESS,
  BASE_FAIL,
  BASE_UPDATE_REQUEST,
  BASE_UPDATE_SUCCESS,
  BASE_UPDATE_FAIL,
  BASE_DETAILS_FAIL,
  BASE_DETAILS_REQUEST,
  BASE_DETAILS_SUCCESS,
  BASE_CREATE_REQUEST,
  BASE_CREATE_SUCCESS,
  BASE_CREATE_FAIL,
  BASE_DELETE_REQUEST,
  BASE_DELETE_SUCCESS,
  BASE_DELETE_FAIL,
} from '../../constants/customProductConstants/baseConstants'

export const listBases = () => async dispatch => {
  try {
    dispatch({
      type: BASE_REQUEST,
    })

    const { data } = await axios.get('/api/custom/base')

    dispatch({
      type: BASE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BASE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBaseDetails = id => async dispatch => {
  try {
    dispatch({
      type: BASE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/base/${id}`)

    dispatch({
      type: BASE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BASE_DETAILS_FAIL,
    })
  }
}

export const createBase = base => async (dispatch, getState) => {
  try {
    dispatch({
      type: BASE_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/base`, base, config)

    dispatch({
      type: BASE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BASE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBase = base => async (dispatch, getState) => {
  try {
    dispatch({
      type: BASE_UPDATE_REQUEST,
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
      `/api/custom/base/${base._id}`,
      base,
      config
    )

    dispatch({
      type: BASE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BASE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBase = id => async (dispatch, getState) => {
  try {
    dispatch({ type: BASE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/base/${id}`, config)

    dispatch({ type: BASE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: BASE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
