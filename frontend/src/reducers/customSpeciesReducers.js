import {
  CUSTOM_SPECIES_REQUEST,
  CUSTOM_SPECIES_SUCCESS,
  CUSTOM_SPECIES_FAIL,
  CUSTOM_SPECIES_UPDATE_REQUEST,
  CUSTOM_SPECIES_UPDATE_SUCCESS,
  CUSTOM_SPECIES_UPDATE_FAIL,
  CUSTOM_SPECIES_UPDATE_RESET,
  CUSTOM_SPECIES_DETAILS_REQUEST,
  CUSTOM_SPECIES_DETAILS_SUCCESS,
  CUSTOM_SPECIES_DETAILS_FAIL,
  CUSTOM_SPECIES_CREATE_REQUEST,
  CUSTOM_SPECIES_CREATE_SUCCESS,
  CUSTOM_SPECIES_CREATE_FAIL,
  CUSTOM_SPECIES_CREATE_RESET,
  CUSTOM_SPECIES_DELETE_REQUEST,
  CUSTOM_SPECIES_DELETE_SUCCESS,
  CUSTOM_SPECIES_DELETE_FAIL,
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

export const customSpeciesDetailsReducer = (
  state = { customSpecies: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_SPECIES_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case CUSTOM_SPECIES_DETAILS_SUCCESS:
      return {
        loading: false,
        customSpecies: action.payload,
      }
    case CUSTOM_SPECIES_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const customSpeciesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_SPECIES_CREATE_REQUEST:
      return { loading: true }
    case CUSTOM_SPECIES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customSpecies: action.payload,
      }
    case CUSTOM_SPECIES_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_SPECIES_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const customSpeciesUpdateReducer = (
  state = { customSpecies: {} },
  action
) => {
  switch (action.type) {
    case CUSTOM_SPECIES_UPDATE_REQUEST:
      return { loading: true }
    case CUSTOM_SPECIES_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        customSpecies: action.payload,
      }
    case CUSTOM_SPECIES_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CUSTOM_SPECIES_UPDATE_RESET:
      return { customSpecies: {} }
    default:
      return state
  }
}

export const customSpeciesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_SPECIES_DELETE_REQUEST:
      return { loading: true }
    case CUSTOM_SPECIES_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CUSTOM_SPECIES_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
