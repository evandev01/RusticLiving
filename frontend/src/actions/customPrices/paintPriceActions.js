import axios from 'axios'
import {
  PAINT_PRICE_REQUEST,
  PAINT_PRICE_SUCCESS,
  PAINT_PRICE_FAIL,
  PAINT_PRICE_UPDATE_REQUEST,
  PAINT_PRICE_UPDATE_SUCCESS,
  PAINT_PRICE_UPDATE_FAIL,
  PAINT_PRICE_DETAILS_FAIL,
  PAINT_PRICE_DETAILS_REQUEST,
  PAINT_PRICE_DETAILS_SUCCESS,
  PAINT_PRICE_CREATE_REQUEST,
  PAINT_PRICE_CREATE_SUCCESS,
  PAINT_PRICE_CREATE_FAIL,
  PAINT_PRICE_DELETE_REQUEST,
  PAINT_PRICE_DELETE_SUCCESS,
  PAINT_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/paintPriceConstants'

export const listPaintPrices = () => async dispatch => {
  try {
    dispatch({
      type: PAINT_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/paint')

    dispatch({
      type: PAINT_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPaintPriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: PAINT_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/paint/${id}`)

    dispatch({
      type: PAINT_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_PRICE_DETAILS_FAIL,
    })
  }
}

export const createPaintPrice = paintPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAINT_PRICE_CREATE_REQUEST,
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
      `/api/customprices/paint`,
      paintPrice,
      config
    )

    dispatch({
      type: PAINT_PRICE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_PRICE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePaintPrice = paintPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAINT_PRICE_UPDATE_REQUEST,
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
      `/api/customprices/paint/${paintPrice._id}`,
      paintPrice,
      config
    )

    dispatch({
      type: PAINT_PRICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAINT_PRICE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePaintPrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: PAINT_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/paint/${id}`, config)

    dispatch({ type: PAINT_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PAINT_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
