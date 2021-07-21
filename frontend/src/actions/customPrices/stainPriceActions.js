import axios from 'axios'
import {
  STAIN_PRICE_REQUEST,
  STAIN_PRICE_SUCCESS,
  STAIN_PRICE_FAIL,
  STAIN_PRICE_UPDATE_REQUEST,
  STAIN_PRICE_UPDATE_SUCCESS,
  STAIN_PRICE_UPDATE_FAIL,
  STAIN_PRICE_DETAILS_FAIL,
  STAIN_PRICE_DETAILS_REQUEST,
  STAIN_PRICE_DETAILS_SUCCESS,
  STAIN_PRICE_CREATE_REQUEST,
  STAIN_PRICE_CREATE_SUCCESS,
  STAIN_PRICE_CREATE_FAIL,
  STAIN_PRICE_DELETE_REQUEST,
  STAIN_PRICE_DELETE_SUCCESS,
  STAIN_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/stainPriceConstants'

export const listStainPrices = () => async dispatch => {
  try {
    dispatch({
      type: STAIN_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/stain')

    dispatch({
      type: STAIN_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listStainPriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: STAIN_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/stain/${id}`)

    dispatch({
      type: STAIN_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_PRICE_DETAILS_FAIL,
    })
  }
}

export const createStainPrice = stainPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAIN_PRICE_CREATE_REQUEST,
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
      `/api/customprices/stain`,
      stainPrice,
      config
    )

    dispatch({
      type: STAIN_PRICE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_PRICE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateStainPrice = stainPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAIN_PRICE_UPDATE_REQUEST,
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
      `/api/customprices/stain/${stainPrice._id}`,
      stainPrice,
      config
    )

    dispatch({
      type: STAIN_PRICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STAIN_PRICE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStainPrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: STAIN_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/stain/${id}`, config)

    dispatch({ type: STAIN_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: STAIN_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
