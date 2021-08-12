import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listPaints } from '../actions/customProducts/paintActions'
import {
  addPaint,
  addPaintTotal,
} from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const PaintForm = ({ resetPaintValue, setResetPaintValue }) => {
  const [checkedValue, setCheckedValue] = useState('')

  const dispatch = useDispatch()

  const paintList = useSelector(state => state.paintList)
  const { paints, error, loading } = paintList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, paint, paintTotal } = tableBuild

  useEffect(() => {
    dispatch(listPaints())

    if (paint) {
      setCheckedValue(paint._id)
    } else {
      setCheckedValue('')
    }

    if (size && paint) {
      dispatch(addPaintTotal(size * paint.paintPrice))
    }
  }, [dispatch, size, paint])

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
                      <Col md={2} key={index}>
                        <Image
                          key={paint.paintImage}
                          src={paint.paintImage}
                          id='paintImage'
                          fluid
                          thumbnail
                          rounded
                        />

                        <Form.Check
                          key={paint._id}
                          id={`radio-${index}`}
                          type='radio'
                          variant='outline-success'
                          name={paint.speciesName}
                          value={paint._id}
                          onChange={() => {
                            setCheckedValue(paint._id)
                            setResetPaintValue(true)
                            dispatch(addPaint(paint._id))
                          }}
                          checked={
                            resetPaintValue === false
                              ? resetPaintValue
                              : paint._id === checkedValue
                          }
                          onClick={() => {
                            dispatch(addPaint(paint._id))
                          }}
                          isValid
                        />
                        <p>
                          {paint.paintName}
                          <br />${paint.paintPrice}
                        </p>
                      </Col>
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
              <h5>
                Total: ${paintTotal && paintTotal !== 0 ? paintTotal : 0}
                .00
              </h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default PaintForm
