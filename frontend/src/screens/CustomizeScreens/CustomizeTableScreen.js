import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Dropdown, DropdownButton, Button } from 'react-bootstrap'
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
  resetAll,
} from '../../actions/customProducts/customPreOrderActions/tableBuildActions'
import { ALL_RESET } from '../../constants/customPreOrderConstants/customBuildConstants'

const CustomizeTableScreen = () => {
  const history = useHistory()
  const [resetSpeciesValue, setResetSpeciesValue] = useState(true)
  const [resetStainValue, setResetStainValue] = useState(true)
  const [resetPaintValue, setResetPaintValue] = useState(true)
  const [resetBaseValue, setResetBaseValue] = useState(true)
  const [size, setSize] = useState('')
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const tableBuild = useSelector(state => state.tableBuild)
  const { size: sizeTable, species, stain, paint, base } = tableBuild

  const resetHandler = e => {
    e.preventDefault()
    dispatch(resetAll())
    setResetSpeciesValue(false)
    setResetStainValue(false)
    setResetPaintValue(false)
    setResetBaseValue(false)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (sizeTable && sizeTable !== 'Size') {
      setSize(sizeTable)
    } else {
      setSize('Size')
    }

    console.log(sizeTable)
  }, [dispatch, sizeTable, species, stain, base, paint])

  return (
    <>
      <Row>
        <Col md={2}>
          <Button type='button' onClick={resetHandler}>
            {' '}
            Reset
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <h2>Select a size: </h2>
        </Col>
        <Col md={8} className='text-left'>
          <>
            <DropdownButton
              id='dropdown-basic'
              title={
                size
                // sizeTable ? sizeTable : 'Size'
                // size && size !== 'Size' ? `${size} ft` : 'Size'
              }
            >
              {sizes.map(num => (
                <Dropdown.Item
                  key={num}
                  onClick={() => {
                    setSize(num)
                    dispatch(addSize(num))
                  }}
                >
                  {num} ft
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </>
        </Col>
      </Row>

      <SpeciesForm
        resetSpeciesValue={resetSpeciesValue}
        setResetSpeciesValue={setResetSpeciesValue}
      />
      <StainForm
        resetStainValue={resetStainValue}
        setResetStainValue={setResetStainValue}
      />
      <PaintForm
        resetPaintValue={resetPaintValue}
        setResetPaintValue={setResetPaintValue}
      />
      <BaseForm
        resetBaseValue={resetBaseValue}
        setResetBaseValue={setResetBaseValue}
      />
      <CustomSubtotalCol />
    </>
  )
}

export default CustomizeTableScreen
