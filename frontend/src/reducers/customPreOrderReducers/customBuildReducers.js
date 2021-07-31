import {
  SIZE_ADD,
  SPECIES_ADD,
  STAIN_ADD,
  PAINT_ADD,
  BASE_ADD,
} from '../../constants/customPreOrderConstants/customBuildConstants'

export const tableBuildReducer = (state = {}, action) => {
  switch (action.type) {
    case SIZE_ADD:
      return { size: action.payload }
    case SPECIES_ADD:
      return { species: action.payload }
    case STAIN_ADD:
      return { stain: action.payload }
    case PAINT_ADD:
      return { paint: action.payload }
    case BASE_ADD:
      return { base: action.payload }
    default:
      return state
  }
}
// export const sizeAddReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SIZE_ADD:
//       return { loading: true, size: action.payload }
//     default:
//       return state
//   }
// }

// export const speciesAddReducer = (state = { species: {} }, action) => {
//   switch (action.type) {
//     case SPECIES_ADD:
//       return { species: action.payload }
//     case SPECIES_ADD_RESET:
//       return { species: {} }
//     default:
//       return state
//   }
// }

// export const speciesTotalAddReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SPECIES_TOTAL_ADD:
//       return { loading: true, speciesTotal: action.payload }
//     // case SIZE_ADD_RESET:
//     //   return {}
//     default:
//       return state
//   }
// }

// export const stainTotalAddReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STAIN_TOTAL_ADD:
//       return { loading: true, stainTotal: action.payload }
//     // case SIZE_ADD_RESET:
//     //   return {}
//     default:
//       return state
//   }
// }

// export const paintTotalAddReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PAINT_TOTAL_ADD:
//       return { loading: true, paintTotal: action.payload }
//     // case SIZE_ADD_RESET:
//     //   return {}
//     default:
//       return state
//   }
// }

// export const baseTotalAddReducer = (state = {}, action) => {
//   switch (action.type) {
//     case BASE_TOTAL_ADD:
//       return { loading: true, baseTotal: action.payload }
//     // case SIZE_ADD_RESET:
//     //   return {}
//     default:
//       return state
//   }
// }
