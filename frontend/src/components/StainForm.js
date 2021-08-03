import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listStains } from '../actions/customProducts/stainActions'
import {
  addStain,
  addStainTotal,
} from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const StainForm = () => {
  const [checkedValue, setCheckedValue] = useState('')
  const [total, setTotal] = useState('')

  const dispatch = useDispatch()

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, stain, stainTotal } = tableBuild

  const stainList = useSelector(state => state.stainList)
  const { stains, error, loading } = stainList

  useEffect(() => {
    dispatch(listStains())

    if (stainTotal && stainTotal !== null) {
      setTotal(stainTotal)
    } else {
      setTotal(0)
    }

    if (stain) {
      setCheckedValue(stain._id)
    }
  }, [dispatch, stain, size, stainTotal])

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
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                stains.map(
                  (stain, index) =>
                    stain.productType === 'Table' && (
                      <Col md={2} key={index}>
                        <Image
                          key={stain.stainImage}
                          src={stain.stainImage}
                          fluid
                          thumbnail
                          rounded
                        />

                        <Form.Check
                          key={stain._id}
                          id={`radio-${index}`}
                          type='radio'
                          variant='outline-success'
                          name={stain.speciesName}
                          value={stain._id}
                          onChange={() => setCheckedValue(stain._id)}
                          checked={stain._id === checkedValue}
                          onClick={() => {
                            dispatch(addStain(stain._id))
                            dispatch(addStainTotal(stain.stainPrice * size))
                          }}
                          isValid
                        />
                        <p>
                          {stain.stainName}
                          <br />${stain.stainPrice}
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
              <h5>Total: ${total}.00</h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default StainForm
