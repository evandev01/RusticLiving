import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTables } from '../actions/customProducts/tableActions'
import {
  addSpecies,
  addSpeciesTotal,
} from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const SpeciesForm = ({ resetSpeciesValue, setResetSpeciesValue }) => {
  const [checkedValue, setCheckedValue] = useState('')
  // const [speciesTotal, setSpeciesTotal] = useState('')

  const dispatch = useDispatch()

  const tableList = useSelector(state => state.tableList)
  const { tables, error, loading } = tableList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, species, speciesTotal } = tableBuild

  useEffect(() => {
    dispatch(listTables())

    if (species) {
      setCheckedValue(species._id)
    } else {
      setCheckedValue('')
    }

    if (size && species) {
      dispatch(addSpeciesTotal(size * species.speciesPrice))
    }
  }, [dispatch, size, species])

  return (
    <Row className='mt-3'>
      <Col md={2}>
        <h5>Select a species: </h5>
        <p>(Cost per sqft)</p>
      </Col>
      <Col md={8}>
        <Card>
          <Form>
            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                tables.map((table, index) => {
                  return (
                    <Col md={3} key={index}>
                      <Image
                        key={table.speciesImage}
                        src={table.speciesImage}
                        id='speciesImage'
                        fluid
                        thumbnail
                        rounded
                      />
                      <Form.Check
                        key={table._id}
                        id={`radio-${index}`}
                        type='radio'
                        variant='outline-success'
                        name={table.speciesName}
                        value={table._id}
                        onChange={() => {
                          setCheckedValue(table._id)
                          setResetSpeciesValue(true)
                          dispatch(addSpecies(table._id))
                        }}
                        checked={
                          resetSpeciesValue === false
                            ? resetSpeciesValue
                            : table._id === checkedValue
                        }
                        isValid
                      ></Form.Check>
                      <p>
                        {table.speciesName}
                        <br />${table.speciesPrice}
                      </p>
                    </Col>
                  )
                })
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
                Total: ${speciesTotal && speciesTotal !== 0 ? speciesTotal : 0}
                .00
              </h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default SpeciesForm
