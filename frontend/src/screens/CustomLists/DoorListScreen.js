import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listDoors,
  deleteDoor,
  listDoorDetails,
} from '../../actions/customProducts/doorActions'

const DoorListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const doorList = useSelector(state => state.doorList)
  const { loading, doors, error } = doorList

  const doorDelete = useSelector(state => state.doorDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = doorDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listDoors())
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteDoor(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/door/create'>
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
            doors && (
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
                      <th>SPECIES</th>
                      <th>IMAGE</th>
                      <th>PRICE/SQFT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {doors.map(door => (
                      <tr key={door._id}>
                        <td>{door._id}</td>
                        <td>{door.speciesName}</td>
                        <td>{door.speciesImage}</td>
                        <td>${door.speciesPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/door/${door._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() => dispatch(listDoorDetails(door._id))}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(door._id)}
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
