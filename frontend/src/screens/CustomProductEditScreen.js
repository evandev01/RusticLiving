// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { listCustomProducts } from '../actions/customProductActions'

// const CustomProductScreen = ({ history }) => {
//   const dispatch = useDispatch()

//   const customProductList = useSelector(state => state.customProductList)
//   const {
//     loading: loadingProducts,
//     customProducts,
//     error: errorProducts,
//   } = customProductList

//   const customAccentList = useSelector(state => state.customAccentList)
//   const {
//     loading: loadingAccents,
//     customAccents,
//     error: errorAccents,
//   } = customAccentList

//   const customBaseList = useSelector(state => state.customBaseList)
//   const {
//     loading: loadingBases,
//     customBases,
//     error: errorBases,
//   } = customBaseList

//   const customPaintList = useSelector(state => state.customPaintList)
//   const {
//     loading: loadingPaints,
//     customPaints,
//     error: errorPaints,
//   } = customPaintList

//   const customSpeciesList = useSelector(state => state.customSpeciesList)
//   const {
//     loading: loadingSpecies,
//     customSpecies,
//     error: errorSpecies,
//   } = customSpeciesList

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {
//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listCustomProducts())
//       dispatch(listCustomAccents())
//       dispatch(listCustomBases())
//       dispatch(listCustomPaints())
//       dispatch(listCustomSpecies())
//       dispatch(listCustomStains())
//     } else {
//       history.push('/login')
//     }
//   }, [dispatch, userInfo, history])

//   return (
//     <>
//       <Link className='btn btn-dark my-3' to='/admin/customproducts'>
//         Go Back
//       </Link>
//       <Row className='align-items-center'>
//         <Col>
//           <h1>Custom Products</h1>
//         </Col>
//         <Col className='text-center'>
//           <Button as='button' size='lg'>
//             Products
//           </Button>
//           <DropdownButton
//             id='dropdown-basic-button'
//             title='SELECT PRODUCT'
//             className='my-3'
//             onClick={createCustomProductHandler}
//           >
//             <Dropdown.Item as='button' active>
//               Products
//             </Dropdown.Item>
//             <Dropdown.Item as='button'>Species</Dropdown.Item>
//             <Dropdown.Item as='button'> Bases</Dropdown.Item>
//             <Dropdown.Item as='button'> Paints</Dropdown.Item>
//             <Dropdown.Item as='button'> Stains</Dropdown.Item>
//             <Dropdown.Item as='button'>Accents</Dropdown.Item>
//           </DropdownButton>
//         </Col>
//       </Row>
//     </>
//   )
// }

// export default CustomProductScreen
