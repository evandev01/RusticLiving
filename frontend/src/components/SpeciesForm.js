import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import {
  listTables,
  // listTableDetails,
} from '../actions/customProducts/tableActions'
import {
  addSpecies,
  addSpeciesTotal,
  getSpeciesTotal,
} from '../actions/customProducts/customPreOrderActions/tableBuildActions'

const SpeciesForm = () => {
  const [checkedValue, setCheckedValue] = useState('')
  const [total, setTotal] = useState(0)
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()

  const tableList = useSelector(state => state.tableList)
  const { tables, error, loading } = tableList

  const tableBuild = useSelector(state => state.tableBuild)
  const { size, species, speciesTotal } = tableBuild

  useEffect(() => {
    dispatch(listTables())

    if (speciesTotal && speciesTotal !== null) {
      setTotal(speciesTotal)
    } else {
      setTotal(0)
    }

    if (species) {
      setCheckedValue(species._id)
    }
  }, [dispatch, species, speciesTotal])

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
              {/* MAP THROUGH Species HERE */}
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
                        onChange={() => setCheckedValue(table._id)}
                        checked={table._id === checkedValue}
                        onClick={() => {
                          dispatch(addSpecies(table._id))
                          dispatch(addSpeciesTotal(table.speciesPrice * size))
                        }}
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
              <h5>Total: ${total}.00</h5>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default SpeciesForm
