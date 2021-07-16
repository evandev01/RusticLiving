import axios from 'axios'
import {
  CUSTOM_SPECIES_REQUEST,
  CUSTOM_SPECIES_SUCCESS,
  CUSTOM_SPECIES_FAIL,
  CUSTOM_SPECIES_DETAILS_REQUEST,
  CUSTOM_SPECIES_DETAILS_SUCCESS,
  CUSTOM_SPECIES_DETAILS_FAIL,
  CUSTOM_SPECIES_CREATE_REQUEST,
  CUSTOM_SPECIES_CREATE_SUCCESS,
  CUSTOM_SPECIES_CREATE_FAIL,
  CUSTOM_SPECIES_UPDATE_REQUEST,
  CUSTOM_SPECIES_UPDATE_SUCCESS,
  CUSTOM_SPECIES_UPDATE_FAIL,
  CUSTOM_SPECIES_DELETE_REQUEST,
  CUSTOM_SPECIES_DELETE_SUCCESS,
  CUSTOM_SPECIES_DELETE_FAIL,
} from '../constants/customSpeciesConstants'

export const listCustomSpecies = () => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_SPECIES_REQUEST,
    })

    const { data } = await axios.get('/api/customspecies')

    dispatch({
      type: CUSTOM_SPECIES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_SPECIES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCustomSpeciesDetails = id => async dispatch => {
  try {
    dispatch({
      type: CUSTOM_SPECIES_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/customspecies/${id}`)

    dispatch({
      type: CUSTOM_SPECIES_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CUSTOM_SPECIES_DETAILS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCustomSpecies =
  customSpecies => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOM_SPECIES_CREATE_REQUEST,
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
        `/api/customspecies`,
        customSpecies,
        config
      )

      dispatch({
        type: CUSTOM_SPECIES_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_SPECIES_CREATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateCustomSpecies =
  customSpecies => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOM_SPECIES_UPDATE_REQUEST })

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
        `/api/customspecies/${customSpecies._id}`,
        customSpecies,
        config
      )

      dispatch({
        type: CUSTOM_SPECIES_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CUSTOM_SPECIES_UPDATE_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteCustomSpecies = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOM_SPECIES_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/customspecies/${id}`, config)

    dispatch({ type: CUSTOM_SPECIES_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CUSTOM_SPECIES_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
