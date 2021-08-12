import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listBases } from '../actions/customProducts/baseActions'
import {
  addBase,
  addBaseTotal,
} from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const BaseForm = ({ resetBaseValue, setResetBaseValue }) => {
  const [checkedValue, setCheckedValue] = useState('')

  const dispatch = useDispatch()

  const baseList = useSelector(state => state.baseList)
  const { bases, error, loading } = baseList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, base, baseTotal } = tableBuild

  useEffect(() => {
    dispatch(listBases())

    if (base) {
      setCheckedValue(base._id)
    } else {
      setCheckedValue('')
    }

    if (size && base) {
      dispatch(addBaseTotal(size * base.basePrice))
    }
  }, [dispatch, size, base])

  return (
    <Row className='mt-3'>
      <Col md={2}>
        <h5>Select a base: </h5>
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
                bases.map(
                  (base, index) =>
                    base.productType === 'Table' && (
                      <Col md={2} key={index}>
                        <Image
                          key={base.baseImage}
                          src={base.baseImage}
                          fluid
                          thumbnail
                          rounded
                        />

                        <Form.Check
                          key={base._id}
                          id={`radio-${index}`}
                          type='radio'
                          variant='outline-success'
                          name={base.speciesName}
                          value={base._id}
                          onChange={() => {
                            setCheckedValue(base._id)
                            setResetBaseValue(true)
                            dispatch(addBase(base._id))
                          }}
                          checked={
                            resetBaseValue === false
                              ? resetBaseValue
                              : base._id === checkedValue
                          }
                          isValid
                        />
                        <p>
                          {base.baseName}
                          <br />${base.basePrice}
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
                Total: ${baseTotal && baseTotal !== 0 ? baseTotal : 0}
                .00
              </h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default BaseForm
