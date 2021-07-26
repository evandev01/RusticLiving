import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Card,
  Form,
  Image,
} from 'react-bootstrap'
// import { useSelector, useDispatch } from 'react-redux'
// import Loader from '../../components/Loader'
// import Message from '../../components/Message'
import StainForm from '../../components/StainForm'
import SpeciesForm from '../../components/SpeciesForm'

const CustomizeTableScreen = () => {
  const [sizeSelect, setSizeSelect] = useState('Size')
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return (
    <>
      <Row>
        <Col md={2}>
          <h2>Select a size: </h2>
        </Col>
        <Col md={8} className='text-left'>
          <DropdownButton id='dropdown-basic-button' title={sizeSelect}>
            {sizes.map(size => (
              <Dropdown.Item key={size} onClick={() => setSizeSelect(size)}>
                {size}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>

      <SpeciesForm />
      <StainForm />
    </>
  )
}

export default CustomizeTableScreen
