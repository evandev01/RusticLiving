import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap'

const CustomSubtotalCol = () => {
  const dispatch = useDispatch()

  const tableBuild = useSelector(state => state.tableBuild)
  const {
    size,
    species,
    speciesTotal,
    stain,
    stainTotal,
    paint,
    paintTotal,
    base,
    baseTotal,
  } = tableBuild

  const totalArr = [speciesTotal, stainTotal, paintTotal, baseTotal]

  useEffect(() => {}, [
    size,
    species,
    speciesTotal,
    stain,
    stainTotal,
    paint,
    paintTotal,
    base,
    baseTotal,
  ])

  return (
    <>
      <Row className='justify-content-center'>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col className='text-left'>
                    <h6>Size:</h6>

                    <h6>Species:</h6>

                    <h6>Stain:</h6>

                    <h6>Paint:</h6>

                    <h6>Base:</h6>
                  </Col>

                  <Col className='text-right'>
                    <h6>
                      <strong>{size && size}</strong> ft
                    </h6>

                    <h6>
                      <strong>{species && species.speciesName}</strong>
                    </h6>

                    <h6>
                      <strong>{stain && stain.stainName}</strong>
                    </h6>

                    <h6>
                      <strong>{paint && paint.paintName}</strong>
                    </h6>

                    <h6>
                      <strong>{base && base.baseName}</strong>
                    </h6>
                  </Col>
                </Row>
                <Row>
                  <Col className='text-left'>
                    <h5>Total:</h5>
                  </Col>

                  <Col className='text-right'>
                    <h5>
                      ${totalArr.reduce((acc, itemTotal) => acc + itemTotal, 0)}
                      .00
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='text-center'>
                <Button
                  type='button'
                  className='btn-block mb-2 p-3'
                  // disabled={!speciesTotal}
                  // onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  type='button'
                  className='btn-block p-2'
                  // disabled={!speciesTotal}
                  // onClick={checkoutHandler}
                >
                  Save for Later
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CustomSubtotalCol
