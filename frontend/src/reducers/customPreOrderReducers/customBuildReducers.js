import {
  SIZE_ADD,
  SPECIES_ADD,
  SPECIES_TOTAL_ADD,
  STAIN_ADD,
  STAIN_TOTAL_ADD,
  PAINT_ADD,
  BASE_ADD,
  SPECIES_TOTAL_REQUEST,
  PAINT_TOTAL_ADD,
  BASE_TOTAL_ADD,
} from '../../constants/customPreOrderConstants/customBuildConstants'

export const tableBuildReducer = (state = {}, action) => {
  switch (action.type) {
    case SIZE_ADD:
      return {
        ...state,
        size: action.payload,
      }
    case SPECIES_ADD:
      return {
        ...state,
        species: action.payload,
      }
    case SPECIES_TOTAL_ADD:
      return {
        ...state,
        speciesTotal: action.payload,
      }
    case STAIN_ADD:
      return {
        ...state,
        stain: action.payload,
      }
    case STAIN_TOTAL_ADD:
      return {
        ...state,
        stainTotal: action.payload,
      }
    case PAINT_ADD:
      return {
        ...state,
        paint: action.payload,
      }
    case PAINT_TOTAL_ADD:
      return {
        ...state,
        paintTotal: action.payload,
      }
    case BASE_ADD:
      return {
        ...state,
        base: action.payload,
      }
    case BASE_TOTAL_ADD:
      return {
        ...state,
        baseTotal: action.payload,
      }
    default:
      return state
  }
}
