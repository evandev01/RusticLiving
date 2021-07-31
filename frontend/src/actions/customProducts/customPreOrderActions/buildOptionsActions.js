// import { BUILD_OPTIONS_CREATE_REQUEST } from '../../../constants/customPreOrderConstants/buildOptionConstants'

// // export const getBuildOptions = () => async (dispatch, getState) => {
// //   const { data } = await getState().buildOptions

// //   dispatch({
// //     type: BUILD_OPTIONS_REQUEST,
// //     payload: {
// //       size: data.size,
// //       speciesName: data.speciesName,
// //       speciesCost: data.speciesCost,
// //       speciesTotal: data.speciesTotal,
// //       stainName: data.stainName,
// //       stainCost: data.stainCost,
// //       stainTotal: data.stainTotal,
// //       baseName: data.baseName,
// //       baseCost: data.baseCost,
// //       baseTotal: data.baseTotal,
// //     },
// //   })
// // }

// export const createBuildOptions =
//   (
//     size,
//     speciesName,
//     speciesCost,
//     speciesTotal,
//     stainName,
//     stainCost,
//     stainTotal,
//     baseName,
//     baseCost,
//     baseTotal
//   ) =>
//   dispatch => {
//     dispatch({
//       type: BUILD_OPTIONS_CREATE_REQUEST,
//       payload: {
//         buildOptions: {
//           size,
//           speciesName,
//           speciesCost,
//           speciesTotal,
//           stainName,
//           stainCost,
//           stainTotal,
//           baseName,
//           baseCost,
//           baseTotal,
//         },
//       },
//     })

//     localStorage.setItem('buildOptions', JSON.stringify(buildOptions))
//   }
