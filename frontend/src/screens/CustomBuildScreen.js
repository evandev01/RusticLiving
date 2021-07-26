import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTablePrices } from '../actions/customPrices/tablePriceActions'
// import { listBedFramePrices } from '../actions/customPrices/bedFramePriceActions'
// import { listDoorPrices } from '../actions/customPrices/doorPriceActions'
// import { listAccentPrices } from '../actions/customPrices/accentPriceActions'
// import { listPaintPrices } from '../actions/customPrices/paintPriceActions'
// import { listStainPrices } from '../actions/customPrices/stainPriceActions'

const CustomBuildScreen = ({ history }) => {
  const [productSelect, setProductSelect] = useState('Product')
  // const [bedFrameSelect, setBedFrameSelect] = useState('')
  // const [doorSelect, setDoorSelect] = useState('')
  // const [accentSelect, setAccentSelect] = useState('')
  // const [paintSelect, setPaintSelect] = useState('')
  // const [stainSelect, setStainSelect] = useState('Stain')
  const [sizeSelect, setSizeSelect] = useState('Size')
  const [speciesSelect, setSpeciesSelect] = useState('Species')
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const [productType, setProductType] = useState('')

  const dispatch = useDispatch()

  const tablePriceList = useSelector(state => state.tablePriceList)
  const {
    loading: loadingTable,
    error: errorTable,
    success: successTable,
    tablePrices,
  } = tablePriceList
  // const { speciesName, pricePerSqFt } = tablePrices

  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listTablePrices())
  }, [dispatch])

  return (
    <>
      <Row>
        <Col className='text-center'>
          <h2>Select Product</h2>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={3}>
          <LinkContainer to='/customize/table'>
            <Image />
          </LinkContainer>
          <Link to='/customize/table'>
            <h1 className='text-center'>Table</h1>
          </Link>
        </Col>

        <Col>
          <LinkContainer to='/customize/bedframe'>
            <Image />
          </LinkContainer>
          <Link to='/customize/bedframe'>
            <h1 className='text-center'>Bed Frame</h1>
          </Link>
        </Col>

        <Col md={3}>
          <LinkContainer to='/customize/door'>
            <Image />
          </LinkContainer>
          <Link to='/customize/door'>
            <h1 className='text-center'>Door</h1>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default CustomBuildScreen
