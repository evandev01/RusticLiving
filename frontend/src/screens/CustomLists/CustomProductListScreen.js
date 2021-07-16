import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomProducts,
  deleteCustomProduct,
  listCustomProductDetails,
} from '../../actions/customProductActions'

const CustomProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customProductList = useSelector(state => state.customProductList)
  const { loading, customProducts, error } = customProductList

  const customProductDelete = useSelector(state => state.customProductDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = customProductDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomProducts())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteCustomProduct(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/customproducts/create'>
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>
      <Link to='/admin/customproducts' className='btn btn-dark my-3'>
        Go Back
      </Link>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            customProducts && (
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
                      <th>NAME</th>
                      <th>EST COMPLETION DATE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customProducts.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.productName}</td>
                        <td>{product.estCompletionDate}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/customproducts/${product._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listCustomProductDetails(product._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
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

export default CustomProductListScreen
