import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {
  listDoorPrices,
  deleteDoorPrice,
  listDoorPriceDetails,
} from '../../../actions/customPrices/doorPriceActions'

const DoorPriceListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const doorPriceList = useSelector(state => state.doorPriceList)
  const { loading, doorPrices, error } = doorPriceList

  const doorPriceDelete = useSelector(state => state.doorPriceDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = doorPriceDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listDoorPrices())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteDoorPrice(id))
  }

  return (
    <>
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/doorprice/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            doorPrices && (
              <>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm mt-4'
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SPECIES NAME</th>
                      <th>PRICE PER SQ FT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {doorPrices.map(price => (
                      <tr key={price._id}>
                        <td>{price._id}</td>
                        <td>{price.speciesName}</td>
                        <td>{price.pricePerSqFt}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/doorprice/${price._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listDoorPriceDetails(price._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(price._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          )}
        </Col>
      </Row>
    </>
  )
}

export default DoorPriceListScreen
