import axios from 'axios'
import {
  TABLE_PRICE_REQUEST,
  TABLE_PRICE_SUCCESS,
  TABLE_PRICE_FAIL,
  TABLE_PRICE_UPDATE_REQUEST,
  TABLE_PRICE_UPDATE_SUCCESS,
  TABLE_PRICE_UPDATE_FAIL,
  TABLE_PRICE_DETAILS_FAIL,
  TABLE_PRICE_DETAILS_REQUEST,
  TABLE_PRICE_DETAILS_SUCCESS,
  TABLE_PRICE_CREATE_REQUEST,
  TABLE_PRICE_CREATE_SUCCESS,
  TABLE_PRICE_CREATE_FAIL,
  TABLE_PRICE_DELETE_REQUEST,
  TABLE_PRICE_DELETE_SUCCESS,
  TABLE_PRICE_DELETE_FAIL,
} from '../../constants/priceConstants/tablePriceConstants'

export const listTablePrices = () => async dispatch => {
  try {
    dispatch({
      type: TABLE_PRICE_REQUEST,
    })

    const { data } = await axios.get('/api/customprices/table')

    dispatch({
      type: TABLE_PRICE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_PRICE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTablePriceDetails = id => async dispatch => {
  try {
    dispatch({
      type: TABLE_PRICE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customprices/table/${id}`)

    dispatch({
      type: TABLE_PRICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_PRICE_DETAILS_FAIL,
    })
  }
}

export const createTablePrice = tablePrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_PRICE_CREATE_REQUEST,
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
      `/api/customprices/table`,
      tablePrice,
      config
    )

    dispatch({
      type: TABLE_PRICE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_PRICE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTablePrice = tablePrice => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_PRICE_UPDATE_REQUEST,
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
      `/api/customprices/table/${tablePrice._id}`,
      tablePrice,
      config
    )

    dispatch({
      type: TABLE_PRICE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_PRICE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTablePrice = id => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_PRICE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customprices/table/${id}`, config)

    dispatch({ type: TABLE_PRICE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TABLE_PRICE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
