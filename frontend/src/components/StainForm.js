import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, Card, Form, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listCustomStains } from '../actions/customStainActions'
import { listStainPrices } from '../actions/customPrices/stainPriceActions'

const StainForm = () => {
  const [stainCost, setStainCost] = useState('')
  const [checkedValue, setCheckedValue] = useState('')

  const dispatch = useDispatch()

  const customStainList = useSelector(state => state.customStainList)
  const { customStains, error, loading } = customStainList

  const stainPriceList = useSelector(state => state.stainPriceList)
  const {
    stainPrices,
    error: errorStain,
    loading: loadingStain,
  } = stainPriceList

  useEffect(() => {
    dispatch(listCustomStains())
    dispatch(listStainPrices())
    stainPrices.map(stain => {
      if (stain.productType === 'Table') {
        setStainCost(stain.pricePerSqFt)
      }
    })
  }, [dispatch, stainCost])

  return (
    <Row className='mt-3'>
      <Col md={2}>
        <h5>Select a stain: </h5>
        <p>(Cost per sq ft)</p>
      </Col>
      <Col md={8}>
        <Card>
          <Form inline>
            <Row>
              {/* MAP THROUGH STAINS HERE */}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                customStains.map((data, index) => (
                  <>
                    <Col md={2}>
                      <Image src={data.stainImage} fluid thumbnail rounded />

                      <Form.Check
                        key={data._id}
                        id={`radio-${index}`}
                        type='radio'
                        variant='outline-success'
                        name={data.speciesName}
                        value={index}
                        onChange={() => setCheckedValue(index)}
                        checked={index === checkedValue}
                        isValid
                      />
                      <p>
                        {data.stainName}
                        <br />${stainCost}
                      </p>
                    </Col>
                  </>
                ))
              )}
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default StainForm
