import axios from 'axios'
import {
  DOOR_PRICE_REQUEST,
  DOOR_PRICE_SUCCESS,
  DOOR_PRICE_FAIL,
  DOOR_PRICE_UPDATE_REQUEST,
  DOOR_PRICE_UPDATE_SUCCESS,
  DOOR_PRICE_UPDATE_FAIL,
  DOOR_PRICE_DETAILS_FAIL,
  DOOR_PRICE_DETAILS_REQUEST,
  DOOR_PRICE_DETAILS_SUCCESS,
  DOOR_PRICE_CREATE_REQUEST,
  DOOR_PRICE_CREATE_SUCCESS,
  DOOR_PRICE_CREATE_FAIL,
  DOOR_PRICE_DELETE_REQUEST,
  DOOR_PRICE_DELETE_SUCCESS,
  DOOR_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/doorPriceConstants'

export const listDoorPrices = () => async dispatch => {
  try {
    dispatch({
      type: DOOR_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/door')

    dispatch({
      type: DOOR_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listDoorPriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: DOOR_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/door/${id}`)

    dispatch({
      type: DOOR_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_PRICE_DETAILS_FAIL,
    })
  }
}

export const createDoorPrice = doorPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOOR_PRICE_CREATE_REQUEST,
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
      `/api/customprices/door`,
      doorPrice,
      config
    )

    dispatch({
      type: DOOR_PRICE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_PRICE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDoorPrice = doorPrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOOR_PRICE_UPDATE_REQUEST,
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
      `/api/customprices/door/${doorPrice._id}`,
      doorPrice,
      config
    )

    dispatch({
      type: DOOR_PRICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_PRICE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDoorPrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DOOR_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/door/${id}`, config)

    dispatch({ type: DOOR_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: DOOR_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
