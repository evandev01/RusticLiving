import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomStains,
  listCustomStainDetails,
  deleteCustomStain,
} from '../../actions/customStainActions'

const CustomStainListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customStainList = useSelector(state => state.customStainList)
  const { loading, customStains, error } = customStainList

  const customStainDelete = useSelector(state => state.customStainDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = customStainDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomStains())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteCustomStain(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Link to='/admin/customproducts' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/customstains/create'>
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
            customStains && (
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
                      <th>IMAGE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customStains.map(stain => (
                      <tr key={stain._id}>
                        <td>{stain._id}</td>
                        <td>{stain.stainName}</td>
                        <td>{stain.stainImage}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/customstains/${stain._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(
                              listCustomStainDetails(stain._id)
                            )}
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

export default CustomStainListScreen
