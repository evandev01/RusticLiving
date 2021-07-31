import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listPaints } from '../actions/customProducts/paintActions'
import { addPaint } from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const PaintForm = () => {
  const [checkedValue, setCheckedValue] = useState('')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState('')

  const dispatch = useDispatch()

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, paint: paintTable } = tableBuild

  const paintList = useSelector(state => state.paintList)
  const { paints, error, loading } = paintList

  useEffect(() => {
    dispatch(listPaints())

    if (size && price) {
      setTotal(size * price)
    }

    if (paintTable) {
      console.log(`paint name: ${paintTable.paintName}`)
    }
  }, [dispatch, size, price, paintTable])

  return (
    <Row className='mt-3'>
      <Col md={2}>
        <h5>Select a paint: </h5>
        <p>(Cost per sq ft)</p>
      </Col>
      <Col md={8}>
        <Card>
          <Form inline>
            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                paints.map(
                  (paint, index) =>
                    paint.productType === 'Table' && (
                      <>
                        <Col md={2} key={paint._id}>
                          <Image
                            src={paint.paintImage}
                            fluid
                            thumbnail
                            rounded
                          />

                          <Form.Check
                            id={`radio-${index}`}
                            type='radio'
                            variant='outline-success'
                            name={paint.speciesName}
                            value={index}
                            onChange={() => setCheckedValue(index)}
                            checked={index === checkedValue}
                            onClick={() => {
                              dispatch(addPaint(paint._id))
                              setPrice(paint.paintPrice)
                            }}
                            isValid
                          />
                          <p>
                            {paint.paintName}
                            <br />${paint.paintPrice}
                          </p>
                        </Col>
                      </>
                    )
                )
              )}
            </Row>
          </Form>
        </Card>
      </Col>
      <Col md={2}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>Total: ${total}</h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default PaintForm
