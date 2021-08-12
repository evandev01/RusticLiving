import axios from 'axios'
import {
  EST_COMP_LIST_REQUEST,
  EST_COMP_LIST_SUCCESS,
  EST_COMP_LIST_FAIL,
  EST_COMP_CREATE_REQUEST,
  EST_COMP_CREATE_SUCCESS,
  EST_COMP_CREATE_FAIL,
  EST_COMP_DETAILS_REQUEST,
  EST_COMP_DETAILS_SUCCESS,
  EST_COMP_DETAILS_FAIL,
  EST_COMP_UPDATE_REQUEST,
  EST_COMP_UPDATE_SUCCESS,
  EST_COMP_UPDATE_FAIL,
  EST_COMP_DELETE_REQUEST,
  EST_COMP_DELETE_SUCCESS,
  EST_COMP_DELETE_FAIL,
} from '../../constants/customProductConstants/estCompConstants'

export const listEstCompDates = () => async dispatch => {
  try {
    dispatch({
      type: EST_COMP_LIST_REQUEST,
    })

    const { data } = await axios.get('/api/custom/estcompdate')

    dispatch({
      type: EST_COMP_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EST_COMP_LIST_FAIL,
      error:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listEstCompDateDetails = id => async dispatch => {
  try {
    dispatch({
      type: EST_COMP_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/estcompdate/${id}`)

    dispatch({
      type: EST_COMP_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EST_COMP_DETAILS_FAIL,
      error:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createEstCompDate = estCompDate => async (dispatch, getState) => {
  try {
    dispatch({
      type: EST_COMP_CREATE_REQUEST,
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
      `/api/custom/estcompdate`,
      estCompDate,
      config
    )

    dispatch({
      type: EST_COMP_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EST_COMP_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateEstCompDate = estCompDate => async (dispatch, getState) => {
  try {
    dispatch({
      type: EST_COMP_UPDATE_REQUEST,
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
      `/api/custom/estcompdate/${estCompDate._id}`,
      estCompDate,
      config
    )

    dispatch({
      type: EST_COMP_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EST_COMP_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteEstCompDate = id => async (dispatch, getState) => {
  try {
    dispatch({ type: EST_COMP_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/estcompdate/${id}`, config)

    dispatch({ type: EST_COMP_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: EST_COMP_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
