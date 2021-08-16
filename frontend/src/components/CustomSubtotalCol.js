import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { listEstCompDateDetails } from '../actions/customProducts/estCompActions'
import { saveCustomPreOrder } from '../actions/customProducts/customPreOrderActions/customPreOrderActions'
import { CUSTOM_PRE_ORDER_ADD_RESET } from '../constants/customPreOrderConstants/customPreOrderConstants'
import { resetAll } from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const CustomSubtotalCol = () => {
  const history = useHistory()
  const [qty, setQty] = useState('')
  const [size, setSize] = useState('')
  const [speciesName, setSpeciesName] = useState('')
  const [speciesImage, setSpeciesImage] = useState('')
  const [stainName, setStainName] = useState('')
  const [stainImage, setStainImage] = useState('')
  const [paintName, setPaintName] = useState('')
  const [paintImage, setPaintImage] = useState('')
  const [baseName, setBaseName] = useState('')
  const [baseImage, setBaseImage] = useState('')
  const [estCompDate, setEstCompDate] = useState('')
  const [productType, setProductType] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [disabled, setDisabled] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const tableBuild = useSelector(state => state.tableBuild)
  const {
    size: sizeTable,
    species,
    stain,
    paint,
    base,
    speciesTotal,
    stainTotal,
    paintTotal,
    baseTotal,
  } = tableBuild

  const estCompDetails = useSelector(state => state.estCompDetails)
  const { estCompDate: estComp, loading, error } = estCompDetails

  const customPreOrderAdd = useSelector(state => state.customPreOrderAdd)
  const {
    success,
    loading: loadingSave,
    error: errorOrder,
    customPreOrder,
  } = customPreOrderAdd

  const totalArr = []

  useEffect(() => {
    if (success) {
      dispatch({ type: CUSTOM_PRE_ORDER_ADD_RESET })
      dispatch(resetAll())
      history.push('/profile')
    }

    if (customPreOrder) {
      console.log(customPreOrder)
    }

    dispatch(listEstCompDateDetails('61099b0e9e612c5b2c4210d1'))

    setProductType('Table')

    setQty(1)

    if (estComp) {
      setEstCompDate(estComp.estCompDate)
    }

    if (sizeTable && sizeTable !== 'Size') {
      setSize(sizeTable)
    } else {
      setSize(0)
    }

    if (species) {
      setSpeciesName(species.speciesName)
      setSpeciesImage(species.speciesImage)
    }
    if (stain) {
      setStainName(stain.stainName)
      setStainImage(stain.stainImage)
    } else {
      setStainName('none')
      setStainImage('none')
    }
    if (paint) {
      setPaintName(paint.paintName)
      setPaintImage(paint.paintImage)
    } else {
      setPaintName('none')
      setPaintImage('none')
    }
    if (base) {
      setBaseName(base.baseName)
      setBaseImage(base.baseImage)
    }

    if (speciesTotal) {
      totalArr.push(speciesTotal)
    } else {
      totalArr.push(0)
    }
    if (stainTotal) {
      totalArr.push(stainTotal)
    } else {
      totalArr.push(0)
    }
    if (paintTotal) {
      totalArr.push(paintTotal)
    } else {
      totalArr.push(0)
    }
    if (baseTotal) {
      totalArr.push(baseTotal)
    } else {
      totalArr.push(0)
    }

    setSubtotal(totalArr.reduce((acc, cur) => acc + cur))

    if (sizeTable !== 'Size' && speciesTotal && baseTotal) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [
    dispatch,
    sizeTable,
    species,
    stain,
    paint,
    base,
    speciesTotal,
    stainTotal,
    paintTotal,
    baseTotal,
    success,
    errorOrder,
    customPreOrder,
  ])

  const saveHandler = e => {
    e.preventDefault()
    dispatch(
      saveCustomPreOrder({
        productType: productType,
        qty: qty,
        size: size,
        speciesName: speciesName,
        speciesImage: speciesImage,
        speciesTotal: speciesTotal,
        stainName: stainName,
        stainImage: stainImage,
        stainTotal: stainTotal,
        paintName: paintName,
        paintImage: paintImage,
        paintTotal: paintTotal,
        baseName: baseName,
        baseImage: baseImage,
        baseTotal: baseTotal,
        estCompDate: estCompDate,
        subtotal: subtotal,
      })
    )
  }

  return (
    <>
      <Row className='justify-content-center mt-3'>
        <Col md={6}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col className='text-left'>
                    <h6>Size:</h6>
                  </Col>
                  <Col className='text-right'>
                    <h6>
                      <strong>{size}</strong> ft
                    </h6>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-left'>
                    <h6>Species:</h6>
                  </Col>
                  <Col className='text-right'>
                    <h6>
                      <strong>
                        {species ? species.speciesName : 'select'}
                      </strong>
                    </h6>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-left'>
                    <h6>Stain:</h6>
                  </Col>
                  <Col className='text-right'>
                    <h6>
                      <strong>{stain ? stain.stainName : 'select'}</strong>
                    </h6>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-left'>
                    <h6>Paint:</h6>
                  </Col>
                  <Col className='text-right'>
                    <h6>
                      <strong>{paint ? paint.paintName : 'select'}</strong>
                    </h6>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-left'>
                    <h6>Base:</h6>
                  </Col>
                  <Col className='text-right'>
                    <h6>
                      <strong>{base ? base.baseName : 'select'}</strong>
                    </h6>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-left'>
                    <h6>Est Comp:</h6>
                  </Col>
                  <Col className='text-right'>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      estComp && (
                        <h6>
                          <strong>{estComp.estCompDate}</strong>
                        </h6>
                      )
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className='text-left'>
                    <h6>Subtotal:</h6>
                  </Col>

                  <Col className='text-right'>
                    <h5>
                      ${subtotal}
                      .00
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='text-center'>
                <Row>
                  <Button
                    type='button'
                    className='btn-block mb-2 p-3'
                    // disabled={!speciesTotal}
                    // onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </Row>{' '}
                <Row>
                  {loadingSave ? (
                    <Loader />
                  ) : errorOrder ? (
                    <Message variant='danger'>{errorOrder}</Message>
                  ) : (
                    console.log(customPreOrder)
                  )}
                  <Button
                    type='submit'
                    className='btn-block p-2'
                    disabled={disabled}
                    onClick={saveHandler}
                  >
                    Save for Later
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CustomSubtotalCol
