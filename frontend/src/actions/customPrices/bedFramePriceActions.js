import axios from 'axios'
import {
  BEDFRAME_PRICE_REQUEST,
  BEDFRAME_PRICE_SUCCESS,
  BEDFRAME_PRICE_FAIL,
  BEDFRAME_PRICE_UPDATE_REQUEST,
  BEDFRAME_PRICE_UPDATE_SUCCESS,
  BEDFRAME_PRICE_UPDATE_FAIL,
  BEDFRAME_PRICE_DETAILS_FAIL,
  BEDFRAME_PRICE_DETAILS_REQUEST,
  BEDFRAME_PRICE_DETAILS_SUCCESS,
  BEDFRAME_PRICE_CREATE_REQUEST,
  BEDFRAME_PRICE_CREATE_SUCCESS,
  BEDFRAME_PRICE_CREATE_FAIL,
  BEDFRAME_PRICE_DELETE_REQUEST,
  BEDFRAME_PRICE_DELETE_SUCCESS,
  BEDFRAME_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/bedFramePriceConstants'

export const listBedFramePrices = () => async dispatch => {
  try {
    dispatch({
      type: BEDFRAME_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/bedframe')

    dispatch({
      type: BEDFRAME_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBedFramePriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: BEDFRAME_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/bedframe/${id}`)

    dispatch({
      type: BEDFRAME_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BEDFRAME_PRICE_DETAILS_FAIL,
    })
  }
}

export const createBedFramePrice =
  bedFramePrice => async (dispatch, getState) => {
    try {
      dispatch({
        type: BEDFRAME_PRICE_CREATE_REQUEST,
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
        `/api/customprices/bedframe`,
        bedFramePrice,
        config
      )

      dispatch({
        type: BEDFRAME_PRICE_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BEDFRAME_PRICE_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateBedFramePrice =
  bedFramePrice => async (dispatch, getState) => {
    try {
      dispatch({
        type: BEDFRAME_PRICE_UPDATE_REQUEST,
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
        `/api/customprices/bedframe/${bedFramePrice._id}`,
        bedFramePrice,
        config
      )

      dispatch({
        type: BEDFRAME_PRICE_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BEDFRAME_PRICE_UPDATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteBedFramePrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: BEDFRAME_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/bedframe/${id}`, config)

    dispatch({ type: BEDFRAME_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: BEDFRAME_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
