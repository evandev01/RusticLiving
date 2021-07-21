import axios from 'axios'
import {
  ACCENT_PRICE_REQUEST,
  ACCENT_PRICE_SUCCESS,
  ACCENT_PRICE_FAIL,
  ACCENT_PRICE_UPDATE_REQUEST,
  ACCENT_PRICE_UPDATE_SUCCESS,
  ACCENT_PRICE_UPDATE_FAIL,
  ACCENT_PRICE_DETAILS_FAIL,
  ACCENT_PRICE_DETAILS_REQUEST,
  ACCENT_PRICE_DETAILS_SUCCESS,
  ACCENT_PRICE_CREATE_REQUEST,
  ACCENT_PRICE_CREATE_SUCCESS,
  ACCENT_PRICE_CREATE_FAIL,
  ACCENT_PRICE_DELETE_REQUEST,
  ACCENT_PRICE_DELETE_SUCCESS,
  ACCENT_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/accentPriceConstants'

export const listAccentPrices = () => async dispatch => {
  try {
    dispatch({
      type: ACCENT_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/accent')

    dispatch({
      type: ACCENT_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAccentPriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: ACCENT_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/accent/${id}`)

    dispatch({
      type: ACCENT_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_PRICE_DETAILS_FAIL,
    })
  }
}

export const createAccentPrice = accentPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCENT_PRICE_CREATE_REQUEST,
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
      `/api/customprices/accent`,
      accentPrice,
      config
    )

    dispatch({
      type: ACCENT_PRICE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_PRICE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAccentPrice = accentPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCENT_PRICE_UPDATE_REQUEST,
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
      `/api/customprices/accent/${accentPrice._id}`,
      accentPrice,
      config
    )

    dispatch({
      type: ACCENT_PRICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCENT_PRICE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAccentPrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCENT_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/accent/${id}`, config)

    dispatch({ type: ACCENT_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCENT_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
