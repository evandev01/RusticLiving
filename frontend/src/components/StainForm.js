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

const StainForm = ({ resetStainValue, setResetStainValue }) => {
  const [checkedValue, setCheckedValue] = useState('')
  // const [stainTotal, setStainTotal] = useState('')

  const dispatch = useDispatch()

  const stainList = useSelector(state => state.stainList)
  const { stains, error, loading } = stainList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, stain, stainTotal } = tableBuild

  useEffect(() => {
    dispatch(listStains())

    if (stain) {
      setCheckedValue(stain._id)
    } else {
      setCheckedValue('')
    }

    if (size && stain) {
      dispatch(addStainTotal(size * stain.stainPrice))
    }
  }, [dispatch, stain, size])

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
                          onChange={() => {
                            setCheckedValue(stain._id)
                            setResetStainValue(true)
                            dispatch(addStain(stain._id))
                          }}
                          checked={
                            resetStainValue === false
                              ? resetStainValue
                              : stain._id === checkedValue
                          }
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
              <h5>
                Total: ${stainTotal && stainTotal !== 0 ? stainTotal : 0}
                .00
              </h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default StainForm
