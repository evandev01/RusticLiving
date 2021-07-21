import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {
  deletePaintPrice,
  listPaintPriceDetails,
  listPaintPrices,
} from '../../../actions/customPrices/paintPriceActions'

const PaintPriceListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const paintPriceList = useSelector(state => state.paintPriceList)
  const { loading, paintPrices, error } = paintPriceList

  const paintPriceDelete = useSelector(state => state.paintPriceDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = paintPriceDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listPaintPrices())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deletePaintPrice(id))
  }

  return (
    <>
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/paintprice/create'>
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
            paintPrices && (
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
                      <th>PRODUCT TYPE</th>
                      <th>PRICE PER SQ FT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paintPrices.map(price => (
                      <tr key={price._id}>
                        <td>{price._id}</td>
                        <td>{price.productType}</td>
                        <td>{price.pricePerSqFt}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/paintprice/${price._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listPaintPriceDetails(price._id))
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

export default PaintPriceListScreen
