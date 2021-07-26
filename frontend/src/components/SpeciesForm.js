import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listCustomSpecies } from '../actions/customSpeciesActions'
// speciesName, speciesImage
import { listTablePrices } from '../actions/customPrices/tablePriceActions'
// speciesName, pricePerSqFt

const SpeciesForm = () => {
  const [checkedValue, setCheckedValue] = useState('')

  const dispatch = useDispatch()

  const customSpeciesList = useSelector(state => state.customSpeciesList)
  const { customSpecies, error, loading } = customSpeciesList

  const tablePriceList = useSelector(state => state.tablePriceList)
  const {
    tablePrices,
    error: errorTable,
    loading: loadingTable,
  } = tablePriceList

  useEffect(() => {
    dispatch(listCustomSpecies())
    dispatch(listTablePrices())
  }, [dispatch])

  return (
    <Row className='mt-3'>
      <Col md={2}>
        <h5>Select a species: </h5>
        <p>(Cost per sq ft)</p>
      </Col>
      <Col md={8}>
        <Card>
          <Form>
            <Row>
              {/* MAP THROUGH Species HERE */}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                tablePrices.speciesName === customSpecies.speciesName &&
                tablePrices.map((data, index) => {
                  return (
                    <Col md={2} key={data._id}>
                      <Image
                        src={customSpecies.speciesImage}
                        id='speciesImage'
                        fluid
                        thumbnail
                        rounded
                      />
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
                      ></Form.Check>
                      <p>
                        {data.speciesName}
                        <br />${data.pricePerSqFt}
                      </p>
                    </Col>
                  )
                })
              )}
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default SpeciesForm
