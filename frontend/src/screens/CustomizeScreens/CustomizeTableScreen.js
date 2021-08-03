import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// import Loader from '../../components/Loader'
// import Message from '../../components/Message'
import StainForm from '../../components/StainForm'
import SpeciesForm from '../../components/SpeciesForm'
import BaseForm from '../../components/BaseForm'
import PaintForm from '../../components/PaintForm'
import CustomSubtotalCol from '../../components/CustomSubtotalCol'
import {
  addSize,
  addSpeciesTotal,
  addStainTotal,
  addPaintTotal,
  addBaseTotal,
} from '../../actions/customProducts/customPreOrderActions/tableBuildActions'

const CustomizeTableScreen = () => {
  const [sizeSelect, setSizeSelect] = useState('')
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  const dispatch = useDispatch()

  const tableBuild = useSelector(state => state.tableBuild)
  const {
    size,
    species,
    stain,
    paint,
    base,
    speciesTotal,
    stainTotal,
    paintTotal,
    baseTotal,
  } = tableBuild

  const result = sizes.find(num => num === size)

  useEffect(() => {
    if (result) {
      setSizeSelect(`${result} ft`)
    } else if (!sizeSelect) {
      setSizeSelect('Size')
    }

    if (size && species) {
      dispatch(addSpeciesTotal(species.speciesPrice * size))
    }
    if (size && stain) {
      dispatch(addStainTotal(stain.stainPrice * size))
    }
    if (size && paint) {
      dispatch(addPaintTotal(paint.paintPrice * size))
    }
    if (size && base) {
      dispatch(addBaseTotal(base.basePrice * size))
    }
  }, [
    dispatch,
    size,
    sizeSelect,
    result,
    species,
    stain,
    // paint,
    // base,
    // speciesTotal,
    // stainTotal,
    // paintTotal,
    // baseTotal,
  ])

  return (
    <>
      <Row>
        <Col md={2}>
          <h2>Select a size: </h2>
        </Col>
        <Col md={8} className='text-left'>
          <>
            <DropdownButton id='dropdown-basic' title={sizeSelect}>
              {sizes.map(num => (
                <Dropdown.Item
                  key={num}
                  onClick={() => {
                    dispatch(addSize(num))
                  }}
                >
                  {num} {'ft'}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </>
        </Col>
      </Row>

      <SpeciesForm />
      <StainForm />
      <PaintForm />
      <BaseForm />
      <CustomSubtotalCol />
    </>
  )
}

export default CustomizeTableScreen
