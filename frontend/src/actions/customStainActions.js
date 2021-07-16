import axios from 'axios'
import {
  CUSTOM_STAIN_REQUEST,
  CUSTOM_STAIN_SUCCESS,
  CUSTOM_STAIN_FAIL,
  CUSTOM_STAIN_DETAILS_REQUEST,
  CUSTOM_STAIN_DETAILS_SUCCESS,
  CUSTOM_STAIN_DETAILS_FAIL,
  CUSTOM_STAIN_CREATE_REQUEST,
  CUSTOM_STAIN_CREATE_SUCCESS,
  CUSTOM_STAIN_CREATE_FAIL,
  CUSTOM_STAIN_UPDATE_REQUEST,
  CUSTOM_STAIN_UPDATE_SUCCESS,
  CUSTOM_STAIN_UPDATE_FAIL,
  CUSTOM_STAIN_DELETE_REQUEST,
  CUSTOM_STAIN_DELETE_SUCCESS,
  CUSTOM_STAIN_DELETE_FAIL,
} from '../constants/customStainConstants'

export const listCustomStains = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_STAIN_REQUEST,
    })

    const { data } = await axios.get('/api/customstains')

    dispatch({
      type: CUSTOM_STAIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCustomStainDetails = id => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_STAIN_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customstains/${id}`)

    dispatch({
      type: CUSTOM_STAIN_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCustomStain = customStain => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOM_STAIN_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/customstains`, customStain, config)

    dispatch({
      type: CUSTOM_STAIN_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCustomStain = customStain => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_STAIN_UPDATE_REQUEST })

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
      `/api/customstains/${customStain._id}`,
      customStain,
      config
    )

    dispatch({
      type: CUSTOM_STAIN_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCustomStain = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_STAIN_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customstains/${id}`, config)

    dispatch({ type: CUSTOM_STAIN_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_STAIN_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
