import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listEstCompDates,
  listEstCompDateDetails,
  deleteEstCompDate,
} from '../../actions/customProducts/estCompActions'

const DoorListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const estCompList = useSelector(state => state.estCompList)
  const { loading, estCompDates, error } = estCompList

  const estCompDelete = useSelector(state => state.estCompDelete)
  const { success: successDelete } = estCompDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listEstCompDates())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteEstCompDate(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link
          // to='/admin/custom/estcompdate/create'
          >
            <Button>
              <i className='fas fa-plus'></i> Create New
            </Button>
          </Link>
        </Col>
      </Row>

      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            estCompDates && (
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
                      <th>COMP DATE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {estCompDates.map(item => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.estCompDate}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/estcompdate/${item._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listEstCompDateDetails(item._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          disabled='true'
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(item._id)}
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

export default DoorListScreen
