import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listBases } from '../actions/customProducts/baseActions'
import { addBase } from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const BaseForm = () => {
  const [checkedValue, setCheckedValue] = useState('')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState('')

  const dispatch = useDispatch()

  const baseList = useSelector(state => state.baseList)
  const { bases, error, loading } = baseList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, base } = tableBuild

  useEffect(() => {
    dispatch(listBases())

    if (size && price) {
      setTotal(size * price)
    }

    if (base) {
      console.log(`base name: ${base.baseName}`)
    }
  }, [dispatch, size, price, base, tableBuild])

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
                      <>
                        <Col md={2} key={base._id}>
                          <Image src={base.baseImage} fluid thumbnail rounded />

                          <Form.Check
                            id={`radio-${index}`}
                            type='radio'
                            variant='outline-success'
                            name={base.speciesName}
                            value={index}
                            onChange={() => setCheckedValue(index)}
                            checked={index === checkedValue}
                            onClick={() => {
                              dispatch(addBase(base._id))

                              setPrice(base.basePrice)
                            }}
                            isValid
                          />
                          <p>
                            {base.baseName}
                            <br />${base.basePrice}
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

export default BaseForm
