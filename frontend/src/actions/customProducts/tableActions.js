import axios from 'axios'
import {
  TABLE_REQUEST,
  TABLE_SUCCESS,
  TABLE_FAIL,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_DETAILS_FAIL,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_CREATE_FAIL,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_SUCCESS,
  TABLE_DELETE_FAIL,
} from '../../constants/customProductConstants/tableConstants'

export const listTables = () => async dispatch => {
  try {
    dispatch({
      type: TABLE_REQUEST,
    })

    const { data } = await axios.get('/api/custom/table')

    dispatch({
      type: TABLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTableDetails = id => async dispatch => {
  try {
    dispatch({
      type: TABLE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/table/${id}`)

    dispatch({
      type: TABLE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_DETAILS_FAIL,
    })
  }
}

export const createTable = table => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/table`, table, config)

    dispatch({
      type: TABLE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTable = table => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_UPDATE_REQUEST,
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
      `/api/custom/table/${table._id}`,
      table,
      config
    )

    dispatch({
      type: TABLE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTable = id => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/table/${id}`, config)

    dispatch({ type: TABLE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TABLE_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
