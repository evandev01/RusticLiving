import {
  CUSTOM_SPECIES_REQUEST,
  CUSTOM_SPECIES_SUCCESS,
  CUSTOM_SPECIES_FAIL,
} from '../constants/customSpeciesConstants'

export const customSpeciesListReducer = (
  state = { customSpecies: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_SPECIES_REQUEST:
      return {
        loading: true,
        customSpecies: [],
      }
    case CUSTOM_SPECIES_SUCCESS:
      return {
        loading: false,
        customSpecies: action.payload,
      }
    case CUSTOM_SPECIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
