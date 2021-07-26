import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listStains,
  listStainDetails,
  deleteStain,
} from '../../actions/customProducts/stainActions'

const StainListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const stainList = useSelector(state => state.stainList)
  const { loading, stains, error } = stainList

  const stainDelete = useSelector(state => state.stainDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = stainDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listStains())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteStain(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/stain/create'>
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
            stains && (
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
                      <th>PRODUCT</th>
                      <th>NAME</th>
                      <th>IMAGE</th>
                      <th>PRICE/SQFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stains.map(stain => (
                      <tr key={stain._id}>
                        <td>{stain._id}</td>
                        <td>{stain.productType}</td>
                        <td>{stain.stainName}</td>
                        <td>{stain.stainImage}</td>
                        <td>{stain.stainPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/stain/${stain._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(listStainDetails(stain._id))}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(stain._id)}
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

export default StainListScreen
