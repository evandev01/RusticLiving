import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import {
  listAccentPrices,
  listAccentPriceDetails,
  deleteAccentPrice,
} from '../../../actions/customPrices/accentPriceActions'

const AccentPriceListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const accentPriceList = useSelector(state => state.accentPriceList)
  const { loading, accentPrices, error } = accentPriceList

  const accentPriceDelete = useSelector(state => state.accentPriceDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = accentPriceDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listAccentPrices())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteAccentPrice(id))
  }

  return (
    <>
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/accentprice/create'>
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
            accentPrices && (
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
                      <th>PRICE PER UNIT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accentPrices.map(price => (
                      <tr key={price._id}>
                        <td>{price._id}</td>
                        <td>{price.productType}</td>
                        <td>{price.pricePerUnit}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/accentprice/${price._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listAccentPriceDetails(price._id))
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

export default AccentPriceListScreen
