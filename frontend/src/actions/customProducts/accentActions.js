import axios from 'axios'
import {
  ACCENT_REQUEST,
  ACCENT_SUCCESS,
  ACCENT_FAIL,
  ACCENT_UPDATE_REQUEST,
  ACCENT_UPDATE_SUCCESS,
  ACCENT_UPDATE_FAIL,
  ACCENT_DETAILS_FAIL,
  ACCENT_DETAILS_REQUEST,
  ACCENT_DETAILS_SUCCESS,
  ACCENT_CREATE_REQUEST,
  ACCENT_CREATE_SUCCESS,
  ACCENT_CREATE_FAIL,
  ACCENT_DELETE_REQUEST,
  ACCENT_DELETE_SUCCESS,
  ACCENT_DELETE_FAIL,
} from '../../constants/customProductConstants/accentConstants'

export const listAccents = () => async dispatch => {
  try {
    dispatch({
      type: ACCENT_REQUEST,
    })

    const { data } = await axios.get('/api/custom/accent')

    dispatch({
      type: ACCENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAccentDetails = id => async dispatch => {
  try {
    dispatch({
      type: ACCENT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/accent/${id}`)

    dispatch({
      type: ACCENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_DETAILS_FAIL,
    })
  }
}

export const createAccent = accent => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCENT_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/accent`, accent, config)

    dispatch({
      type: ACCENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAccent = accent => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCENT_UPDATE_REQUEST,
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
      `/api/custom/accent/${accent._id}`,
      accent,
      config
    )

    dispatch({
      type: ACCENT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAccent = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCENT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/accent/${id}`, config)

    dispatch({ type: ACCENT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCENT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
