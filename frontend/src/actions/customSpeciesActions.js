import axios from 'axios'
import {
  CUSTOM_SPECIES_REQUEST,
  CUSTOM_SPECIES_SUCCESS,
  CUSTOM_SPECIES_FAIL,
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
