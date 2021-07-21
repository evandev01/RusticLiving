import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {
  listBedFramePrices,
  deleteBedFramePrice,
  listBedFramePriceDetails,
} from '../../../actions/customPrices/bedFramePriceActions'

const BedFramePriceListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bedFramePriceList = useSelector(state => state.bedFramePriceList)
  const { loading, bedFramePrices, error } = bedFramePriceList

  const bedFramePriceDelete = useSelector(state => state.bedFramePriceDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = bedFramePriceDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listBedFramePrices())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteBedFramePrice(id))
  }

  return (
    <>
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/bedframeprice/create'>
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
            bedFramePrices && (
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
                    {bedFramePrices.map(price => (
                      <tr key={price._id}>
                        <td>{price._id}</td>
                        <td>{price.speciesName}</td>
                        <td>{price.pricePerSqFt}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/bedframeprice/${price._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listBedFramePriceDetails(price._id))
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

export default BedFramePriceListScreen
