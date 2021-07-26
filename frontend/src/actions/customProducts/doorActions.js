import axios from 'axios'
import {
  DOOR_REQUEST,
  DOOR_SUCCESS,
  DOOR_FAIL,
  DOOR_UPDATE_REQUEST,
  DOOR_UPDATE_SUCCESS,
  DOOR_UPDATE_FAIL,
  DOOR_DETAILS_FAIL,
  DOOR_DETAILS_REQUEST,
  DOOR_DETAILS_SUCCESS,
  DOOR_CREATE_REQUEST,
  DOOR_CREATE_SUCCESS,
  DOOR_CREATE_FAIL,
  DOOR_DELETE_REQUEST,
  DOOR_DELETE_SUCCESS,
  DOOR_DELETE_FAIL,
} from '../../constants/customProductConstants/doorConstants'

export const listDoors = () => async dispatch => {
  try {
    dispatch({
      type: DOOR_REQUEST,
    })

    const { data } = await axios.get('/api/custom/door')

    dispatch({
      type: DOOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listDoorDetails = id => async dispatch => {
  try {
    dispatch({
      type: DOOR_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/custom/door/${id}`)

    dispatch({
      type: DOOR_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_DETAILS_FAIL,
    })
  }
}

export const createDoor = door => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOOR_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/custom/door`, door, config)

    dispatch({
      type: DOOR_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDoor = door => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOOR_UPDATE_REQUEST,
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
      `/api/custom/door/${door._id}`,
      door,
      config
    )

    dispatch({
      type: DOOR_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOOR_UPDATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDoor = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DOOR_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/custom/door/${id}`, config)

    dispatch({ type: DOOR_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: DOOR_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
