import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listCustomBases,
  listCustomBaseDetails,
  deleteCustomBase,
} from '../../actions/customBaseActions'

const CustomBaseListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const customBaseList = useSelector(state => state.customBaseList)
  const { loading, customBases, error } = customBaseList

  const customBaseDelete = useSelector(state => state.customBaseDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = customBaseDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listCustomBases())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteCustomBase(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custombases/create'>
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
            customBases && (
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
                    {customBases.map(base => (
                      <tr key={base._id}>
                        <td>{base._id}</td>
                        <td>{base.baseName}</td>
                        <td>{base.baseImage}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custombases/${base._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={dispatch(listCustomBaseDetails(base._id))}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(base._id)}
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

export default CustomBaseListScreen
