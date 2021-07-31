import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// import Loader from '../../components/Loader'
// import Message from '../../components/Message'
import StainForm from '../../components/StainForm'
import SpeciesForm from '../../components/SpeciesForm'
import BaseForm from '../../components/BaseForm'
import PaintForm from '../../components/PaintForm'
import { addSize } from '../../actions/customProducts/customPreOrderActions/tableBuildActions'

const CustomizeTableScreen = () => {
  const [sizeSelect, setSizeSelect] = useState('')
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const [speciesSelect, setSpeciesSelect] = useState('')

  const dispatch = useDispatch()

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, species, base } = tableBuild

  useEffect(() => {
    if (sizeSelect !== '') {
      dispatch(addSize(sizeSelect))
    } else {
      dispatch(addSize(0))
    }
    if (species) {
      setSpeciesSelect(species.speciesName)
    }
  }, [dispatch, size, sizeSelect, species, base])

  return (
    <>
      <Row>
        <Col md={2}>
          <h2>Select a size: </h2>
        </Col>
        <Col md={8} className='text-left'>
          <DropdownButton id='dropdown-basic-button' title={sizeSelect}>
            {sizes.map(num => (
              <Dropdown.Item
                key={num}
                onClick={() => {
                  setSizeSelect(num)
                }}
              >
                {num} {'ft'}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>

      <SpeciesForm />
      <StainForm />
      <PaintForm />
      <BaseForm />

      <Row className='justify-content-center'>
        <Col md={4} className='text-left'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <p>Size: {size && size}</p>
                <p>Species: {speciesSelect} </p>

                {/* <p>Species Price: $</p> */}
                {/* <p>Stain: </p> */}
                {/* <p>Stain Price: $</p> */}
                {/* <p>Paint: </p> */}
                {/* <p>Paint Price: $</p> */}
                {/* <p>Base: </p> */}
                {/* <p>Base Price: $</p> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={!size && !species && !base}
                  // onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CustomizeTableScreen
