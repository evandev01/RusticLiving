import axios from 'axios'
import {
  SIZE_ADD,
  SPECIES_ADD,
  STAIN_ADD,
  PAINT_ADD,
  BASE_ADD,
} from '../../../constants/customPreOrderConstants/customBuildConstants'

export const addSize = size => async dispatch => {
  dispatch({
    type: SIZE_ADD,
    payload: size,
  })

  localStorage.setItem('size', JSON.stringify(size))
}

export const addSpecies = id => async dispatch => {
  const { data } = await axios.get(`/api/custom/table/${id}`)

  dispatch({
    type: SPECIES_ADD,
    payload: data,
  })

  localStorage.setItem('species', JSON.stringify(data))
}

export const addStain = id => async dispatch => {
  const { data } = await axios.get(`/api/custom/stain/${id}`)

  dispatch({
    type: STAIN_ADD,
    payload: data,
  })

  localStorage.setItem('stain', JSON.stringify(data))
}

export const addPaint = id => async dispatch => {
  const { data } = await axios.get(`/api/custom/paint/${id}`)

  dispatch({
    type: PAINT_ADD,
    payload: data,
  })

  localStorage.setItem('paint', JSON.stringify(data))
}

export const addBase = id => async dispatch => {
  const { data } = await axios.get(`/api/custom/base/${id}`)

  dispatch({
    type: BASE_ADD,
    payload: data,
  })

  localStorage.setItem('base', JSON.stringify(data))
}

// export const addPaintTotal = paintTotal => async dispatch => {
//   dispatch({
//     type: PAINT_TOTAL_ADD,
//     payload: paintTotal,
//   })

//   localStorage.setItem('paintTotal', JSON.stringify(paintTotal))
// }

// export const addBaseTotal = baseTotal => async dispatch => {
//   dispatch({
//     type: BASE_TOTAL_ADD,
//     payload: baseTotal,
//   })

//   localStorage.setItem('baseTotal', JSON.stringify(baseTotal))
// }
