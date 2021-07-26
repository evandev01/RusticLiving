import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import CustomProductButtons from '../../components/CustomProductButtons'
import {
  listAccents,
  listAccentDetails,
  deleteAccent,
} from '../../actions/customProducts/accentActions'

const AccentListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const accentList = useSelector(state => state.accentList)
  const { loading, accents, error } = accentList

  const accentDelete = useSelector(state => state.accentDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = accentDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listAccents())
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = id => {
    window.confirm('Are you sure?')
    dispatch(deleteAccent(id))
  }

  return (
    <>
      <CustomProductButtons />
      <Row>
        <Col className='text-center p-3'>
          <Link to='/admin/custom/accent/create'>
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
            accents && (
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
                      <th>PRICE/UNIT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accents.map(accent => (
                      <tr key={accent._id}>
                        <td>{accent._id}</td>
                        <td>{accent.productType}</td>
                        <td>{accent.accentName}</td>
                        <td>{accent.accentImage}</td>
                        <td>${accent.accentPrice}</td>
                        <td></td>
                        <LinkContainer
                          to={`/admin/custom/accent/${accent._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              dispatch(listAccentDetails(accent._id))
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(accent._id)}
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

export default AccentListScreen
