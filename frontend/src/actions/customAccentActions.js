import axios from 'axios'
import {
  CUSTOM_ACCENT_REQUEST,
  CUSTOM_ACCENT_SUCCESS,
  CUSTOM_ACCENT_FAIL,
  CUSTOM_ACCENT_DETAILS_REQUEST,
  CUSTOM_ACCENT_DETAILS_SUCCESS,
  CUSTOM_ACCENT_DETAILS_FAIL,
  CUSTOM_ACCENT_CREATE_REQUEST,
  CUSTOM_ACCENT_CREATE_SUCCESS,
  CUSTOM_ACCENT_CREATE_FAIL,
  CUSTOM_ACCENT_UPDATE_REQUEST,
  CUSTOM_ACCENT_UPDATE_SUCCESS,
  CUSTOM_ACCENT_UPDATE_FAIL,
  CUSTOM_ACCENT_DELETE_REQUEST,
  CUSTOM_ACCENT_DELETE_SUCCESS,
  CUSTOM_ACCENT_DELETE_FAIL,
} from '../constants/customAccentConstants'

export const listCustomAccents = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_ACCENT_REQUEST,
    })

    const { data } = await axios.get('/api/customaccents')

    dispatch({
      type: CUSTOM_ACCENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_ACCENT_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCustomAccentDetails = id => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_ACCENT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customaccents/${id}`)

    dispatch({
      type: CUSTOM_ACCENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_ACCENT_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCustomAccent =
  customAccent => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_ACCENT_CREATE_REQUEST,
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
        `/api/customaccents`,
        customAccent,
        config
      )

      dispatch({
        type: CUSTOM_ACCENT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_ACCENT_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateCustomAccent =
  customAccent => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOM_ACCENT_UPDATE_REQUEST })

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
        `/api/customaccents/${customAccent._id}`,
        customAccent,
        config
      )

      dispatch({
        type: CUSTOM_ACCENT_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_ACCENT_UPDATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteCustomAccent = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_ACCENT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customaccents/${id}`, config)

    dispatch({ type: CUSTOM_ACCENT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_ACCENT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
